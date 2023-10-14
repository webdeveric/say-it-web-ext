import { byLocaleCompare } from '@webdeveric/utils/sort';
import { byProperty } from '@webdeveric/utils/sort-factory';
import { until } from '@webdeveric/utils/until';

export async function getVoices(): Promise<SpeechSynthesisVoice[]> {
  try {
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
        callLimit: 5,
      },
    );

    data.sort(byProperty(byLocaleCompare, 'name'));

    return data;
  } catch (error) {
    console.info(error);
  }

  return [];
}
