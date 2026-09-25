import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './Pages/App.tsx';
import "./styles/app.scss";

const queryClient = new QueryClient();

{/* This guy just exists, I wouldn't worry too much about him. He makes the web app run. */}

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
