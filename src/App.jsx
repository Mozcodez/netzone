import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import { useAuth } from "./store/hooks/useAuth";
import { VoucherProvider } from "./store/VoucherContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Landing from "./pages/Landing";
import AdminLogin from "./pages/AdminLogin";
import Portal from "./pages/Portal";
import DashboardHome from "./pages/DashboardHome";
import Vouchers from "./pages/Vouchers";
import Sessions from "./pages/Sessions";
import Settings from "./pages/Settings";

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          color: "var(--text-muted)",
          fontSize: "14px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/portal" element={<Portal />} />
      <Route path="/admin" element={<AdminLogin />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="vouchers" element={<Vouchers />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <VoucherProvider>
          <AppRoutes />
        </VoucherProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
