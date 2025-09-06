import { Toaster } from '@/components/ui/sonner';
import { SignatureProvider } from '@/context/signature-context';
import theme from '@/lib/mui-theme';
import { ThemeProvider } from '@mui/material';
import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotFound from '@/components/not-found';
import Error from '@/components/error';
import type { FormType } from '@/types';
import { removeItem } from '@/lib/utils';
import { FORMS } from '@/lib/constants';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: RootRoute,
  errorComponent: Error,
  notFoundComponent: NotFound,
  beforeLoad: () => {
    const clearForm: FormType | 'all' | undefined = import.meta.env
      .VITE_CLEAR_FORM;

    console.log(clearForm);

    if (clearForm) {
      switch (clearForm) {
        case 'intake':
          removeItem(FORMS.intake);
          return;
        case 'credit_card':
          removeItem(FORMS.credit_card);
          return;
        case 'provider_onboarding':
          removeItem(FORMS.provider_onboarding);
          return;
        case 'all':
          removeItem(FORMS.intake);
          removeItem(FORMS.credit_card);
          removeItem(FORMS.provider_onboarding);
          return;
        default:
          return;
      }
    }
  },
  head: () => ({
    meta: [
      {
        title: 'Orenda Forms',
      },
    ],
  }),
});

function RootRoute() {
  return (
    <>
      <HeadContent />

      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SignatureProvider>
            <Outlet />
          </SignatureProvider>

          <Toaster richColors />
        </ThemeProvider>
        <TanStackRouterDevtools />
      </QueryClientProvider>
    </>
  );
}
