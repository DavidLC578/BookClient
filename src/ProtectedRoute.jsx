import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
export function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return <p>Loading...</p>;
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <Outlet />
}