import { until } from '@webdeveric/utils';

export async function getVoices(): Promise<SpeechSynthesisVoice[]> {
  // Sometimes speechSynthesis.getVoices() will return an empty array.
  // Lets try to getVoices() a few times before giving up.
  const data = await until<SpeechSynthesisVoice[]>(
    resolve => {
      const voices = window.speechSynthesis.getVoices();

      if (voices.length) {
        resolve(voices);
      }
    },
    {
      delay: context => 100 * context.callCount,
      callLimit: 10,
    },
  );

  data.sort((a, b) => a.name.localeCompare(b.name));

  return data;
}
