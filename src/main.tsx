import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './Pages/App.tsx';
import "./styles/app.scss";

{/* This guy just exists, I wouldn't worry too much about him. He makes the web app run. */}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
