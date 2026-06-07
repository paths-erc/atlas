import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { unregister } from './registerServiceWorker';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
unregister();
