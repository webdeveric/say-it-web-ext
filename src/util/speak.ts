export type SpeakOptions = {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
  voice?: SpeechSynthesisVoice | null;
};

export async function speak(
  text: string,
  options: SpeakOptions = {
    rate: 1,
    pitch: 1,
    volume: 1,
    lang: navigator.language,
    voice: null,
  },
): Promise<SpeechSynthesisEvent> {
  return new Promise((resolve, reject) => {
    if ('speechSynthesis' in window) {
      const phrase = Object.assign(new SpeechSynthesisUtterance(text), options);

      phrase.addEventListener('end', event => resolve(event));
      phrase.addEventListener('error', event => reject(event));

      window.speechSynthesis.speak(phrase);

      return;
    }

    reject(new Error('speechSynthesis is not supported'));
  });
}
