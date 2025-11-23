import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Safety check for process.env in case index.html polyfill missed it (redundant but safe)
if (typeof process === 'undefined') {
  (window as any).process = { env: { API_KEY: '' } };
}

// GLOBAL ERROR HANDLER
// If the app crashes (white screen), this will print the error to the screen
window.addEventListener('error', (event) => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px; color: #ff6b6b; font-family: monospace; background: #1e1e2e; height: 100vh;">
        <h2 style="font-size: 20px; margin-bottom: 10px;">Application Error</h2>
        <p style="margin-bottom: 20px;">The application failed to start.</p>
        <div style="background: #111; padding: 15px; border-radius: 8px; border: 1px solid #333;">
          ${event.message} <br/>
          <span style="color: #666; font-size: 12px;">${event.filename}:${event.lineno}</span>
        </div>
      </div>
    `;
  }
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Mounting error:", error);
  rootElement.innerHTML = `<div style="color:red; padding: 20px;">Failed to mount React application. Check console for details.</div>`;
}
