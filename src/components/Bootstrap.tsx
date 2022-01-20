import { type FunctionComponent, StrictMode } from 'react';

import { ErrorBoundary } from './ErrorBoundary';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Bootstrap: FunctionComponent = ({ children }) => {
  return (
    <StrictMode>
      <ErrorBoundary>{children}</ErrorBoundary>
    </StrictMode>
  );
};
