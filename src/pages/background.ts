import { browser, Menus } from 'webextension-polyfill-ts';
import { BrowserStorageKey, SessionStorageKey } from '../models';
import speak, { SpeakOptions } from '../util/speak';
import { getVoices } from '../util/getVoices';

import '../icons/speaker.svg';

function maybeLogError(): void {
  if (browser.runtime.lastError) {
    console.log(browser.runtime.lastError);
  }
}

async function getSpeakOptions(): Promise<SpeakOptions> {
  const options = await browser.storage.local.get([
    BrowserStorageKey.Pitch,
    BrowserStorageKey.Rate,
    BrowserStorageKey.Volume,
    BrowserStorageKey.VoiceName,
  ]);

  const voices = await getVoices();

  const voice = voices.find(v => v.name === options[BrowserStorageKey.VoiceName]);

  if (voice) {
    options.voice = voice;
  }

  delete options[BrowserStorageKey.VoiceName];

  return options;
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
    title: 'Say it',
    contexts: ['selection'],
  },
  maybeLogError,
);

browser.contextMenus.onClicked.addListener(onContextMenuClick);

browser.commands.onCommand.addListener(handleOnCommand);
