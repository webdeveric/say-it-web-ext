import { createRoot } from 'react-dom/client';

import { BrowserActionPage } from '../components/BrowserActionPage';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<BrowserActionPage />);
