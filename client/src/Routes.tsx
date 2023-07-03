import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Spinner from './components/Spinner';

const Auth = lazy(() => import('./components/ProtectedRoute'));
const Upload = lazy(() => import('./pages/Upload'));
const Landing = lazy(() => import('./pages/Landing'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-[calc(100svh_-_148px)] px-4 py-8 lg:min-h-[calc(100svh_-_164px)]">
            <Spinner theme="dark" className="mx-auto h-8 w-auto" />
          </div>
        }
      >
        <Routes>
          <Route
            path="/upload"
            element={
              <Auth>
                <Upload />
              </Auth>
            }
          />
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
