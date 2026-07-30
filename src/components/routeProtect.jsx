import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = localStorage.getItem("user");
  const storedRoles = localStorage.getItem("userRole");
  const roles = storedRoles ? JSON.parse(storedRoles) : [];



  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = allowedRoles ? allowedRoles.some(role => roles.includes(role)) : true;

  if (!hasAccess) {
    return <Navigate to="/home" replace />;
  }

  return children;
}