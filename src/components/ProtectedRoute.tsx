import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // Check if user is logged in by looking for token
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/auth" replace />;
  }

  // If token exists, allow access to the route
  return <Outlet />;
}
