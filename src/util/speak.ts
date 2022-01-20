export type SpeakOptions = {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
  voice?: SpeechSynthesisVoice | null;
};

export type EventHandler<E extends Event> = (event: E) => void | Record<'handleEvent', (event: E) => void>;

export const utteranceEvents: (keyof SpeechSynthesisUtteranceEventMap)[] = [
  'boundary',
  'end',
  'error',
  'mark',
  'pause',
  'resume',
  'start',
];

export async function speak(
  text: string,
  options: SpeakOptions = {
    rate: 1,
    pitch: 1,
    volume: 1,
    lang: navigator.language,
    voice: null,
  },
  eventHandler?: EventHandler<SpeechSynthesisEvent | SpeechSynthesisErrorEvent>,
): Promise<SpeechSynthesisEvent> {
  return new Promise((resolve, reject) => {
    if ('speechSynthesis' in window) {
      const phrase = Object.assign(new SpeechSynthesisUtterance(text), options);

      phrase.addEventListener('end', event => resolve(event));
      phrase.addEventListener('error', event => reject(event));

      if (eventHandler) {
        utteranceEvents.forEach(eventName => {
          phrase.addEventListener(eventName, eventHandler, false);
        });
      }

      window.speechSynthesis.speak(phrase);

      return;
    }

    reject(new Error('speechSynthesis is not supported'));
  });
}
