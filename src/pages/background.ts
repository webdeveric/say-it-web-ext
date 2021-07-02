import { browser, Menus } from 'webextension-polyfill-ts';
import { getSpeakOptions } from '../util/getSpeakOptions';
import { SessionStorageKey } from '../models';
import { speak } from '../util/speak';

import '../icons/speaker.svg';

function maybeLogError(): void {
  if (browser.runtime.lastError) {
    console.log(browser.runtime.lastError);
  }
}

async function onContextMenuClick(info: Menus.OnClickData): Promise<void> {
  if (info.menuItemId === 'say-selection' && info.selectionText) {
    await speak(info.selectionText, await getSpeakOptions());

    window.sessionStorage.setItem(SessionStorageKey.LastPhrase, info.selectionText);
  }
}

async function handleOnCommand(command: string): Promise<void> {
  switch (command) {
    case 'stop-speaking': {
      window.speechSynthesis.cancel();

      break;
    }
    case 'repeat-last-phrase': {
      const lastPhrase = window.sessionStorage.getItem(SessionStorageKey.LastPhrase);

      if (lastPhrase) {
        await speak(lastPhrase, await getSpeakOptions());
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
