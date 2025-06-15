import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './layouts/layout.jsx';
import Home from './pages/home.jsx';

import './styles/index.css';
import Success from './pages/success.jsx';
import NotFound from './pages/not-found.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'intake',
        Component: Home,
      },
      {
        path: 'success',
        Component: Success,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
