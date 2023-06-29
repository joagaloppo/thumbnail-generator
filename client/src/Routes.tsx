import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Suspense } from 'react';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-[calc(100svh_-_144px)] px-4 lg:min-h-[calc(100svh_-_168px)]"></div>}>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
