import browser from 'webextension-polyfill';

import { BrowserStorageKey } from '../models/storage.js';

import { getVoices } from './getVoices.js';

import type { SpeakOptions } from './speak.js';

export async function getSpeakOptions(): Promise<SpeakOptions> {
  // eslint-disable-next-line import/no-named-as-default-member
  const options = await browser.storage.local.get([
    BrowserStorageKey.Pitch,
    BrowserStorageKey.Rate,
    BrowserStorageKey.Volume,
    BrowserStorageKey.VoiceName,
  ]);

  const voices = await getVoices();

  const voice = voices.find(voice => voice.name === options[BrowserStorageKey.VoiceName]);

  if (voice) {
    options.voice = voice;
  }

  delete options[BrowserStorageKey.VoiceName];

  return options;
}
