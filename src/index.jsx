import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

// A previous version of the site registered a service worker: make sure none lingers.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready
    .then(registration => registration.unregister())
    .catch(() => {});
}
