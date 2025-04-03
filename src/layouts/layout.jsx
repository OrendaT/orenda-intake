import { ThemeProvider } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import theme from '../lib/mui-theme';
import { useEffect } from 'react';

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollTo(0, 0);
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
};
export default Layout;
