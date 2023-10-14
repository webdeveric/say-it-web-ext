import cn from 'classnames';
import {
  type ChangeEventHandler,
  type FormEventHandler,
  type FunctionComponent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useSpeech } from '../../contexts/SpeechContext.js';
import { speak } from '../../utils/speak.js';
import { getLastPhrase, setLastPhrase } from '../../utils/storage.js';

import * as styles from './SpeechForm.css';

const keyboardShortcutText = /Macintosh|Mac OS/i.test(navigator.userAgent) ? 'Cmd+Enter' : 'Ctrl+Enter';

type ErrorCodeMessageProps = {
  errorCode: SpeechSynthesisErrorCode;
};

const ErrorCodeMessage: FunctionComponent<ErrorCodeMessageProps> = ({ errorCode }) => {
  return (
    <p>
      An error has occurred: <q>{errorCode}</q>
    </p>
  );
};

export const SpeechForm: FunctionComponent = () => {
  const speech = useSpeech();

  const [text, setText] = useState('');

  const [pending, setPending] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [errorCode, setErrorCode] = useState<SpeechSynthesisErrorCode>();

  useEffect(() => {
    getLastPhrase()
      .then(setText)
      .catch(error => console.error(error));
  }, []);

  const handleSpeechEvents = useCallback((event: SpeechSynthesisEvent | SpeechSynthesisErrorEvent) => {
    switch (event.type) {
      case 'start':
        setPlaying(true);
        setPending(false);

        break;
      case 'end':
        setPlaying(false);
        setPending(false);

        break;
      case 'error':
        if (event instanceof SpeechSynthesisErrorEvent) {
          setPlaying(false);
          setPending(false);
          setErrorCode(event.error);
        }

        break;
      default:
        console.log(event);
    }
  }, []);

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    event => {
      setText(event.target.value);

      setLastPhrase(event.target.value).catch(error => console.error(error));
    },
    [setText],
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    event => {
      event.preventDefault();

      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }

      if (text) {
        speak(text, speech, handleSpeechEvents).catch(error => console.error(error));
      }
    },
    [speech, text, handleSpeechEvents],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (text && (event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        setPending(true);

        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }

        speak(text, speech, handleSpeechEvents).catch(error => console.error(error));
      }
    },
    [speech, text, handleSpeechEvents],
  );

  const icon = errorCode ? '😡' : playing ? '🔇' : pending ? '⏳' : '🔊';

  return (
    <form onSubmit={onSubmit} className={styles.speechForm}>
      <textarea
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        spellCheck="true"
        value={text}
        placeholder="Type something to say"
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={cn('browser-style', styles.textInput)}
      ></textarea>

      {errorCode && <ErrorCodeMessage errorCode={errorCode} />}

      <button type="submit" className={cn('browser-style', styles.button)} disabled={!text || pending || playing}>
        <span className={styles.buttonText}>{icon}</span>
        <span className={styles.buttonText}>Say It</span>
        <small className={styles.buttonText}>{keyboardShortcutText}</small>
      </button>
    </form>
  );
};
