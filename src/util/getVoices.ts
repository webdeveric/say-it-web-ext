import { until } from '@webdeveric/utils';

export async function getVoices(): Promise<SpeechSynthesisVoice[]> {
  let data: SpeechSynthesisVoice[] = [];

  try {
    // Sometimes speechSynthesis.getVoices() will return an empty array.
    // Lets try to getVoices() a few times before giving up.
    data = await until<SpeechSynthesisVoice[]>(
      resolve => {
        const voices = window.speechSynthesis.getVoices();

        if (voices.length) {
          resolve(voices);
        }
      },
      {
        delay: context => 100 * context.callCount,
        callLimit: 5,
      },
    );

    data.sort((left, right) => left.name.localeCompare(right.name));
  } catch (error) {
    console.info(error);
  }

  return data;
}
