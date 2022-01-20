import { browser } from 'webextension-polyfill-ts';
import { BrowserStorageKey } from '../models/storage';

export async function getLastPhrase(defaultValue = ''): Promise<string> {
  const { [BrowserStorageKey.LastPhrase]: value = defaultValue } =
    (await browser.storage.local.get(BrowserStorageKey.LastPhrase)) ?? {};

  return value;
}

export async function setLastPhrase(value: string): Promise<void> {
  await browser.storage.local.set({
    [BrowserStorageKey.LastPhrase]: value,
  });
}
