import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { router } from '@routes';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            borderRadius: '8px',
            border: '1px solid #334155',
            fontFamily: 'inherit',
          },
          success: { duration: 3000, icon: '✅' },
          error: { duration: 5000, icon: '❌' },
        }}
      />
    </>
  );
}
