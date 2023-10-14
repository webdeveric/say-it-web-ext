/* eslint-disable import/no-named-as-default-member */
import browser, { type Menus } from 'webextension-polyfill';

import { SessionStorageKey } from '@models/storage.js';
import { getSpeakOptions } from '@utils/getSpeakOptions.js';
import { speak } from '@utils/speak.js';

import '../icons/speaker.svg';

function maybeLogError(): void {
  if (browser.runtime.lastError) {
    console.log(browser.runtime.lastError);
  }
}

function onContextMenuClick(info: Menus.OnClickData): void {
  const { selectionText } = info;

  if (info.menuItemId === 'say-selection' && selectionText) {
    window.sessionStorage.setItem(SessionStorageKey.LastPhrase, selectionText);

    getSpeakOptions().then(
      options => speak(selectionText, options),
      error => console.error(error),
    );
  }
}

function handleOnCommand(command: string): void {
  switch (command) {
    case 'stop-speaking': {
      window.speechSynthesis.cancel();

      break;
    }
    case 'repeat-last-phrase': {
      const lastPhrase = window.sessionStorage.getItem(SessionStorageKey.LastPhrase);

      if (lastPhrase) {
        getSpeakOptions().then(
          options => speak(lastPhrase, options),
          error => console.error(error),
        );
      }

      break;
    }
    default: {
      console.info(`Unknown command ${command}`);
    }
  }
}

browser.contextMenus.create(
  {
    id: 'say-selection',
    title: '&Say “%s”',
    contexts: ['selection'],
  },
  maybeLogError,
);

browser.contextMenus.onClicked.addListener(onContextMenuClick);

browser.commands.onCommand.addListener(handleOnCommand);
