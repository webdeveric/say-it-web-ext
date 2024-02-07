import { afterAll, it, beforeAll, describe, expect, vi, afterEach } from 'vitest';

import { getVoices } from './getVoices.js';

describe('getVoices()', () => {
  beforeAll(() => {
    vi.spyOn(globalThis.console, 'info').mockImplementation(() => {});
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  const defaultSpeechSynthesis = window.speechSynthesis;

  afterEach(() => {
    window.speechSynthesis = defaultSpeechSynthesis;
  });

  it('Can return empty array', async () => {
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      writable: true,
      value: {
        getVoices: vi.fn(() => []),
      },
    });

    await expect(getVoices()).resolves.toHaveLength(0);

    expect(console.info).toHaveBeenCalled();
  });

  it('Tries multiple times to get voices', async () => {
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      writable: true,
      value: {
        getVoices: vi
          .fn<SpeechSynthesisVoice[]>(() => [])
          .mockImplementationOnce(() => [])
          .mockImplementationOnce(() => [
            {
              default: true,
              lang: 'en-US',
              localService: false,
              name: 'Test',
              voiceURI: '',
            },
            {
              default: false,
              lang: 'en-GB',
              localService: false,
              name: 'Test (GB)',
              voiceURI: '',
            },
          ]),
      },
    });

    await expect(getVoices()).resolves.toHaveLength(2);
  });
});
