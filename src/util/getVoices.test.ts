import { getVoices } from './getVoices';

describe('getVoices()', () => {
  beforeAll(() => {
    jest.spyOn(global.console, 'info').mockImplementation();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('Can return empty array', async () => {
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      writable: true,
      value: {
        getVoices: jest.fn(() => []),
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
        getVoices: jest
          .fn<SpeechSynthesisVoice[], never>(() => [])
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
