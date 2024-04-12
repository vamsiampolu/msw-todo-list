import { type ReactNode, type PropsWithChildren } from 'react';
import * as rtl from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type RenderOptions = Parameters<typeof rtl.render>[1];

export function customRender(
  ui: ReactNode,
  { ...options }: RenderOptions = {},
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        gcTime: Infinity,
      },
    },
  });

  const CombinedProviders = ({ children }: PropsWithChildren<{}>) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  return rtl.render(ui, {
    ...options,
    wrapper: CombinedProviders,
  });
}

export { customRender as render };
