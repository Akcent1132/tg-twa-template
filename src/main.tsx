import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';

// Say something
console.log('[ERWT] : Renderer execution started');

createRoot(document.getElementById('root')).render(<App />);
