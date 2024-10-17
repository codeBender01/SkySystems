import { Navigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const ProtectedRoute = ({ Component }) => {
  const { state } = useLocation();
  const token = cookies.get("adminAccessToken");

  return state || token ? (
    <Component />
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

export default ProtectedRoute;
