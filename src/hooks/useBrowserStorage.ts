import { browser, Storage } from 'webextension-polyfill-ts';
import { useEffect, useState } from 'react';

import { BrowserStorageKey, StorageArea } from '../models';

export type StorageHook<T> = {
  error?: Error;
  value?: T;
  loading: boolean;
  set: (value: T) => Promise<void>;
  remove: () => Promise<void>;
};

export const useBrowserStorage = <T = unknown>(
  key: BrowserStorageKey,
  initialValue?: T,
  storageArea: StorageArea = StorageArea.Local,
): StorageHook<T> => {
  const [value, setValue] = useState<T | undefined>(initialValue);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  const set = (value: T): Promise<void> => browser.storage[storageArea].set({ [key]: value });

  const remove = (): Promise<void> => browser.storage[storageArea].remove(key);

  useEffect(() => {
    setLoading(true);

    browser.storage[storageArea]
      .get(key)
      .then(
        results => {
          console.groupCollapsed(`[useStorage hook] Getting ${key} from browser.storage.${storageArea}`);
          console.info(results);
          console.groupEnd();

          if (Object.prototype.hasOwnProperty.call(results, key)) {
            setValue(results[key]);
          }
        },
        error => {
          console.groupCollapsed(`[useStorage hook] Error getting ${key} from browser.storage.${storageArea}`);
          console.error(error);
          console.groupEnd();

          setError(error);
        },
      )
      .finally(() => setLoading(false));
  }, [key, storageArea]);

  useEffect(() => {
    const onChanged = (changes: Record<string, Storage.StorageChange>, areaName: string): void => {
      if (areaName === storageArea && Object.prototype.hasOwnProperty.call(changes, key)) {
        console.info(`[useStorage hook] ${key} changed in browser.storage.${storageArea}`);

        setValue(changes[key].newValue);
      }
    };

    browser.storage.onChanged.addListener(onChanged);

    return () => {
      browser.storage.onChanged.removeListener(onChanged);
    };
  }, [key, storageArea]);

  return { error, value, loading, set, remove };
};
