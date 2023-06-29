import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Landing from './pages/Landing';

const Auth = lazy(() => import('./components/ProtectedRoute'));
const Upload = lazy(() => import('./pages/Upload'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-[calc(100svh_-_144px)] px-4 lg:min-h-[calc(100svh_-_168px)]"></div>}>
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
