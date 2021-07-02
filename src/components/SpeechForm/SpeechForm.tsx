import React, { useCallback, useState } from 'react';

import { speak } from '../../util';
import { useSpeech } from '../../contexts/SpeechContext';

import * as styles from './SpeechForm.css';

export const SpeechForm = (): JSX.Element => {
  const speech = useSpeech();

  const [text, setText] = useState('');

  const onChange = useCallback(event => {
    setText(event.target.value);
  }, []);

  const onSubmit = useCallback(
    event => {
      event.preventDefault();

      text && speak(text, speech);
    },
    [speech, text],
  );

  return (
    <form onSubmit={onSubmit} className={styles.speechForm}>
      <textarea value={text} onChange={onChange} className={styles.textInput}></textarea>
      <button type="submit" className={styles.button}>
        Say It
      </button>
    </form>
  );
};
