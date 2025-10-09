import { useAuth } from "@auth/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import MAIN_ROUTES from "./path";

const PublicRoutes = ({ children }) => {

    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div className="p-4">Verificando sesión...</div>;
  
    if (isAuthenticated) {
      return <Navigate to={MAIN_ROUTES.DASHBOARD} replace />;
    }

    return <Outlet />;
}

export default PublicRoutes;