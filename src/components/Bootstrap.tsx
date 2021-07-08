import { FunctionComponent, StrictMode } from 'react';

import { ErrorBoundary } from './ErrorBoundary';

export const Bootstrap: FunctionComponent = ({ children }) => {
  return (
    <StrictMode>
      <ErrorBoundary>{children}</ErrorBoundary>
    </StrictMode>
  );
};
