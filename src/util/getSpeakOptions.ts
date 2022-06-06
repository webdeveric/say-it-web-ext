import { browser } from 'webextension-polyfill-ts';
import { BrowserStorageKey } from '../models';
import { getVoices } from './getVoices';
import type { SpeakOptions } from './speak';

export async function getSpeakOptions(): Promise<SpeakOptions> {
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
