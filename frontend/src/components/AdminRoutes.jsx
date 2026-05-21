import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AdminRoutes() {
  const { auth } = useAuth();

  if (auth === undefined) return "loading...";

  return auth?.isLoggedIn && auth?.isAdmin ? <Outlet /> : <Navigate to='/' />
}

export default AdminRoutes;
