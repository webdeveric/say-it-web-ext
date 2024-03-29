import { useEffect, useState } from 'react';

import { getVoices } from '@utils/getVoices.js';

export const useVoices = (): {
  voices: SpeechSynthesisVoice[];
  loading: boolean;
} => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handler = (): void => {
      setLoading(true);
      getVoices()
        .then(setVoices)
        .then(
          () => setLoading(false),
          error => {
            setLoading(false);
            console.error(error);
          },
        );
    };

    handler();

    window.speechSynthesis.addEventListener('voiceschanged', handler, false);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handler, false);
    };
  }, []);

  return { voices, loading };
};
