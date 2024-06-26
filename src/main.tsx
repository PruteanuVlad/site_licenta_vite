import ReactDOM from 'react-dom/client';
import App from './App';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
    });
  }
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
