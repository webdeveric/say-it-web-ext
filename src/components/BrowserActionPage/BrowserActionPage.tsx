import type { VoidFunctionComponent } from 'react';

import { Bootstrap } from '../Bootstrap';
import { SpeechDetailsProvider } from '../../contexts/SpeechContext';
import { SpeechForm } from '../SpeechForm/SpeechForm';

import './BrowserActionPage.css';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BrowserActionPage: VoidFunctionComponent = () => {
  return (
    <Bootstrap>
      <SpeechDetailsProvider>
        <SpeechForm />
      </SpeechDetailsProvider>
    </Bootstrap>
  );
};
