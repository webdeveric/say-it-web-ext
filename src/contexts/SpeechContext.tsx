import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { BrowserStorageKey } from '../models';
import { getVoices } from '../util/getVoices';
import { useBrowserStorage } from '../hooks';

export type SpeechDetails = {
  lang: string;
  pitch: number;
  rate: number;
  voice?: SpeechSynthesisVoice;
  volume: number;
};

const defaultSpeechDetails: SpeechDetails = {
  lang: navigator.language,
  pitch: 1,
  rate: 1,
  voice: undefined,
  volume: 1,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SpeechContext = createContext<SpeechDetails>(defaultSpeechDetails);

SpeechContext.displayName = 'SpeechContext';

export const useSpeech = (): SpeechDetails => useContext(SpeechContext);

export const createSpeechDetails = async ({
  pitch,
  rate,
  volume,
  voiceName,
}: Partial<Omit<SpeechDetails, 'voice'> & { voiceName: string }>): Promise<SpeechDetails> => {
  const options = {
    ...defaultSpeechDetails,
    pitch: pitch ?? defaultSpeechDetails.pitch,
    rate: rate ?? defaultSpeechDetails.rate,
    volume: volume ?? defaultSpeechDetails.volume,
    voice: defaultSpeechDetails.voice,
  };

  if (voiceName) {
    const voices = await getVoices();

    const voice = voices.find(voice => voice.name === voiceName);

    if (voice) {
      options.voice = voice;
    }
  }

  return options;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SpeechDetailsProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [value, setContextValue] = useState<SpeechDetails>(defaultSpeechDetails);

  const { value: pitch } = useBrowserStorage(BrowserStorageKey.Pitch, defaultSpeechDetails.pitch);
  const { value: rate } = useBrowserStorage<number>(BrowserStorageKey.Rate, 1.0);
  const { value: volume } = useBrowserStorage<number>(BrowserStorageKey.Volume, 1.0);
  const { value: voiceName } = useBrowserStorage<string>(BrowserStorageKey.VoiceName);

  useEffect(() => {
    createSpeechDetails({
      pitch,
      rate,
      volume,
      voiceName,
    }).then(
      details => setContextValue(details),
      error => console.error(error),
    );
  }, [pitch, rate, volume, voiceName]);

  return <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>;
};
