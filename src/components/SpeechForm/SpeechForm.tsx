import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { browser } from 'webextension-polyfill-ts';
import cn from 'classnames';

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

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (text && (event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        speak(text, speech);
      }
    },
    [speech, text],
  );

  return (
    <form onSubmit={onSubmit} className={styles.speechForm}>
      <textarea
        value={text}
        placeholder="Type something to say"
        ref={textareaRef}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={cn('browser-style', styles.textInput)}
      ></textarea>
      <button type="submit" className={cn('browser-style', styles.button)} disabled={!text}>
        <span className={styles.buttonText}>Say It</span>
        <small className={styles.buttonText}>(Ctrl+Enter or Cmd+Enter)</small>
      </button>
    </form>
  );
};
