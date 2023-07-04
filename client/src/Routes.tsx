import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Spinner from './components/Spinner';
import useAuth from './hooks/isAuth';

const Upload = lazy(() => import('./pages/Upload'));
const Landing = lazy(() => import('./pages/Landing'));

const Fallback = () => {
  return (
    <div className="flex min-h-[calc(100svh_-_88.8px)] items-center px-4 py-20 sm:min-h-[calc(100svh_-_60.8px)]">
      <Spinner theme="dark" className="mx-auto h-8 w-auto" />
    </div>
  );
};

function AppRoutes() {
  const isAuth = useAuth();
  return (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/" element={isAuth ? <Upload /> : <Landing />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
