import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './store/AuthContext';
import { VoucherProvider } from './store/VoucherContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import Landing from './pages/Landing';
import AdminLogin from './pages/AdminLogin';
import Portal from './pages/Portal';
import DashboardHome from './pages/DashboardHome';
import Vouchers from './pages/Vouchers';
import Sessions from './pages/Sessions';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <VoucherProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/admin" element={<AdminLogin />} />

            {/* Protected admin routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardHome />} />
              <Route path="vouchers" element={<Vouchers />} />
              <Route path="sessions" element={<Sessions />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </VoucherProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
