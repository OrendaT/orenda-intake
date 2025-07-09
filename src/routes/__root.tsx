import { Toaster } from '@/components/ui/sonner';
import SignatureProvider from '@/context/signature-context';
import theme from '@/lib/mui-theme';
import { ThemeProvider } from '@mui/material';
import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotFound from '@/components/not-found';
import Error from '@/components/error';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />

      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SignatureProvider>
            <Outlet />
          </SignatureProvider>

          <Toaster />
        </ThemeProvider>
        <TanStackRouterDevtools />
      </QueryClientProvider>
    </>
  ),
  errorComponent: Error,
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      {
        title: 'Orenda Forms',
      },
    ],
  }),
});
