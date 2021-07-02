import React from 'react';

import { Bootstrap } from '../Bootstrap';
import { SpeechDetailsProvider } from '../../contexts/SpeechContext';
import { SpeechForm } from '../SpeechForm/SpeechForm';

import './BrowserActionPage.css';

export const BrowserActionPage = (): JSX.Element => {
  return (
    <Bootstrap>
      <SpeechDetailsProvider>
        <SpeechForm />
      </SpeechDetailsProvider>
    </Bootstrap>
  );
};
