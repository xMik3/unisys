import {useContext} from "react";
import type {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from "../context/authContext";

export function ProtectedRoute({children}: {children: ReactNode}) {
  const auth = useContext(AuthContext);
  if (!auth?.isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}
