import { type FunctionComponent, type PropsWithChildren, StrictMode } from 'react';

import { ErrorBoundary } from './ErrorBoundary/ErrorBoundary.js';

export const Bootstrap: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <StrictMode>
      <ErrorBoundary>{children}</ErrorBoundary>
    </StrictMode>
  );
};
