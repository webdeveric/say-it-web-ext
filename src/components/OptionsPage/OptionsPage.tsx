import cn from 'classnames';
import { type ChangeEvent, useCallback } from 'react';

import { useBrowserStorage } from '@hooks/useBrowserStorage.js';
import { useVoices } from '@hooks/useVoices.js';
import { BrowserStorageKey } from '@models/storage.js';

import { Bootstrap } from '../Bootstrap.js';
import { RangeSlider } from '../RangeSlider/RangeSlider.js';

import * as styles from './OptionsPage.css';

const [languageCode] = navigator.language.split('-');

export const OptionsPage = (): JSX.Element => {
  const { value: pitch, loading: pitchLoading, set: setPitch } = useBrowserStorage(BrowserStorageKey.Pitch, 1.0);
  const { value: rate, loading: rateLoading, set: setRate } = useBrowserStorage(BrowserStorageKey.Rate, 1.0);
  const { value: volume, loading: volumeLoading, set: setVolume } = useBrowserStorage(BrowserStorageKey.Volume, 1.0);
  const {
    value: voiceName,
    loading: voiceNameLoading,
    set: setVoiceName,
  } = useBrowserStorage<string>(BrowserStorageKey.VoiceName);
  const { voices, loading: voicesLoading } = useVoices();
  const voicesInYourLang = voices.filter(voice => languageCode && voice.lang.startsWith(languageCode));
  const voicesNotInYourLang = voices.filter(voice => languageCode && !voice.lang.startsWith(languageCode));

  const onVoiceNameChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setVoiceName(event.target.value).catch(error => console.error(error));
    },
    [setVoiceName],
  );

  const onPitchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPitch(parseFloat(event.target.value)).catch(error => console.error(error));
    },
    [setPitch],
  );

  const onRateChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRate(parseFloat(event.target.value)).catch(error => console.error(error));
    },
    [setRate],
  );

  const onVolumeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setVolume(parseFloat(event.target.value)).catch(error => console.error(error));
    },
    [setVolume],
  );

  return (
    <Bootstrap>
      <div className={cn(styles.inputRow, styles.selectRow)}>
        <label className={styles.label} htmlFor="voice">
          Voice
        </label>
        {(voicesLoading || voiceNameLoading) && <p>Loading voices</p>}
        {!voicesLoading && !voices.length && <p>Voices unavailable</p>}
        {!voiceNameLoading && !voicesLoading && voices.length > 0 && (
          <select
            id="voice"
            onChange={onVoiceNameChange}
            defaultValue={voiceName}
            className={cn(styles.input, styles.selectBox)}
          >
            <option value=""></option>
            <optgroup label="Voices in your language">
              {voicesInYourLang.map(voice => (
                <option key={voice.voiceURI} value={voice.name} title={voice.lang}>
                  {voice.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Other voices">
              {voicesNotInYourLang.map(voice => (
                <option key={voice.voiceURI} value={voice.name} title={voice.lang}>
                  {voice.name}
                </option>
              ))}
            </optgroup>
          </select>
        )}
      </div>

      <div className={styles.inputRow}>
        <label className={styles.label} htmlFor="pitch-slider">
          Pitch
        </label>
        <output className={styles.output}>{pitch}</output>
        {!pitchLoading && (
          <RangeSlider
            id="pitch-slider"
            className={styles.input}
            onChange={onPitchChange}
            value={pitch}
            min={0}
            max={2}
            step={0.01}
            ticks
          />
        )}
      </div>

      <div className={styles.inputRow}>
        <label className={styles.label} htmlFor="rate-slider">
          Rate
        </label>
        <output className={styles.output}>{rate}</output>
        {!rateLoading && (
          <RangeSlider
            id="rate-slider"
            className={styles.input}
            onChange={onRateChange}
            value={rate}
            min={0.1}
            max={3}
            step={0.01}
            ticks
          />
        )}
      </div>

      <div className={styles.inputRow}>
        <label className={styles.label} htmlFor="volume-slider">
          Volume
        </label>
        <output className={styles.output}>{volume}</output>
        {!volumeLoading && (
          <RangeSlider
            id="volume-slider"
            className={styles.input}
            onChange={onVolumeChange}
            value={volume}
            min={0}
            max={1}
            step={0.01}
            ticks
          />
        )}
      </div>
    </Bootstrap>
  );
};
