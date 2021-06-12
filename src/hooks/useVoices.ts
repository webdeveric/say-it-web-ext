import { useEffect, useState } from 'react';

import { getVoices } from '../util/getVoices';

export const useVoices = (): {
  voices: SpeechSynthesisVoice[];
  loading: boolean;
} => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handler = async () => {
      setLoading(true);
      setVoices(await getVoices());
      setLoading(false);
    };

    handler();

    window.speechSynthesis.addEventListener('voiceschanged', handler, false);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handler, false);
    };
  }, []);

  return { voices, loading };
};
