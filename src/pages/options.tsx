import { createRoot } from 'react-dom/client';

import { OptionsPage } from '../components/OptionsPage/OptionsPage.js';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<OptionsPage />);
