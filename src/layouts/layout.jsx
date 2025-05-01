import { ThemeProvider } from '@mui/material';
import { Outlet, useLocation } from 'react-router';
import theme from '@/lib/mui-theme';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import SignatureProvider from '@/context/signature-context';

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollTo(0, 0);
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <SignatureProvider>
        <Outlet />
      </SignatureProvider>

      <Toaster />
    </ThemeProvider>
  );
};
export default Layout;
