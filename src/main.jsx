import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './layouts/layout.jsx';
import IntakeForm from './pages/intake.jsx';

import './styles/index.css';
import NotFound from './pages/not-found.jsx';
import CreditCardForm from './pages/credit-card.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: IntakeForm,
      },
      {
        path: 'intake',
        Component: IntakeForm,
      },
      {
        path: 'credit-card',
        Component: CreditCardForm,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
