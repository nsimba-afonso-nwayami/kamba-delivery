import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ allowedTypes }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <i className="fas fa-spinner animate-spin text-red-700 text-5xl mb-4"></i>
              <p className="text-red-600 text-2xl font-semibold">Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedTypes && !allowedTypes.includes(user?.tipo)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
