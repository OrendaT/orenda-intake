import { Toaster } from "@/components/ui/sonner";
import SignatureProvider from "@/context/signature-context";
import theme from "@/lib/mui-theme";
import { ThemeProvider } from "@mui/material";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SignatureProvider>
          <Outlet />
        </SignatureProvider>

        <Toaster />
      </ThemeProvider>
      <TanStackRouterDevtools />
    </QueryClientProvider>
  ),
  errorComponent: (props) => {
    return (
      <div>
        <h1>Something went wrong!</h1>
        <p>Error message: {props.error.message}</p>
        <p>Component: {props.info?.componentStack}</p>
      </div>
    );
  },
});
