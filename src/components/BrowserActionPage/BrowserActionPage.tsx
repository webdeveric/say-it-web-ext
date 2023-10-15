import { SpeechDetailsProvider } from '@contexts/SpeechContext.jsx';

import { Bootstrap } from '../Bootstrap.js';
import { SpeechForm } from '../SpeechForm/SpeechForm.js';

import './BrowserActionPage.css';

import type { FunctionComponent } from 'react';

export const BrowserActionPage: FunctionComponent = () => {
  return (
    <Bootstrap>
      <SpeechDetailsProvider>
        <SpeechForm />
      </SpeechDetailsProvider>
    </Bootstrap>
  );
};
