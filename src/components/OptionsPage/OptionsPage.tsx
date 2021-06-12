import React, { ChangeEvent, useCallback } from 'react';
import cn from 'classnames';

import { useBrowserStorage, useVoices } from '../../hooks';
import { Bootstrap } from '../Bootstrap';
import { BrowserStorageKey } from '../../models';
import { RangeSlider } from '../RangeSlider';

import * as styles from './OptionsPage.css';

const [languageCode] = navigator.language.split('-');

export const OptionsPage = (): JSX.Element => {
  const {
    value: pitch,
    loading: pitchLoading,
    set: setPitch,
  } = useBrowserStorage<number>(BrowserStorageKey.Pitch, 1.0);
  const { value: rate, loading: rateLoading, set: setRate } = useBrowserStorage<number>(BrowserStorageKey.Rate, 1.0);
  const {
    value: volume,
    loading: volumeLoading,
    set: setVolume,
  } = useBrowserStorage<number>(BrowserStorageKey.Volume, 1.0);
  const {
    value: voiceName,
    loading: voiceNameLoading,
    set: setVoiceName,
  } = useBrowserStorage<string>(BrowserStorageKey.VoiceName);
  const { voices, loading: voicesLoading } = useVoices();
  const voicesInYourLang = voices.filter(voice => voice.lang.startsWith(languageCode));
  const voicesNotInYourLang = voices.filter(voice => !voice.lang.startsWith(languageCode));

  const onVoiceNameChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setVoiceName(e.target.value);
    },
    [setVoiceName],
  );

  const onPitchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPitch(parseFloat(e.target.value));
    },
    [setPitch],
  );

  const onRateChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRate(parseFloat(e.target.value));
    },
    [setRate],
  );

  const onVolumeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setVolume(parseFloat(e.target.value));
    },
    [setVolume],
  );

  return (
    <Bootstrap>
      <div className={cn(styles.inputRow, styles.selectRow)}>
        <label className={styles.label}>Voice</label>
        {(voicesLoading || voiceNameLoading) && <p>Loading voices</p>}
        {!voicesLoading && !voices.length && <p>Voices unavailable</p>}
        {!voiceNameLoading && !voicesLoading && voices.length > 0 && (
          <select onChange={onVoiceNameChange} defaultValue={voiceName} className={cn(styles.input, styles.selectBox)}>
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
        <label className={styles.label}>Pitch</label>
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
        <label className={styles.label}>Rate</label>
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
        <label className={styles.label}>Volume</label>
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
