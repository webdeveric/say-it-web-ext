import React, { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { browser } from 'webextension-polyfill-ts';

import { BrowserStorageKey } from '../../models';
import { speak } from '../../util';
import { useSpeech } from '../../contexts/SpeechContext';

import * as styles from './SpeechForm.css';

export const SpeechForm = (): JSX.Element => {
  const speech = useSpeech();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [text, setText] = useState('');

  useEffect(() => {
    browser.storage.local.get(BrowserStorageKey.LastPhrase).then(({ [BrowserStorageKey.LastPhrase]: value }) => {
      setText(value);
    });
  }, []);

  useEffect(() => {
    const { current } = textareaRef;

    if (current) {
      current.focus();
    }
  }, [textareaRef]);

  const onChange = useCallback(
    event => {
      setText(event.target.value);

      browser.storage.local.set({
        [BrowserStorageKey.LastPhrase]: event.target.value,
      });
    },
    [setText],
  );

  const onSubmit = useCallback(
    event => {
      event.preventDefault();

      text && speak(text, speech);
    },
    [speech, text],
  );

  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (text && (event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        speak(text, speech);
      }
    },
    [speech, text],
  );

  return (
    <form onSubmit={onSubmit} className={styles.speechForm}>
      <label className={styles.label} htmlFor="phrase">
        Enter something to say
      </label>
      <textarea
        id="phrase"
        value={text}
        ref={textareaRef}
        onChange={onChange}
        onKeyUp={onKeyUp}
        className={styles.textInput}
      ></textarea>
      <button type="submit" className={styles.button} disabled={text.length === 0}>
        Say It <small>(Ctrl+Enter or Cmd+Enter)</small>
      </button>
    </form>
  );
};
