import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { queryClient } from './queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return undefined;
  }

  const { worker } = await import('./mocks/browser');
  return worker.start();
}

await enableMocking();

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>,
  );
}
