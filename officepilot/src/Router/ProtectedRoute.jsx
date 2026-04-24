import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { CloudCog } from "lucide-react";
import AuthContext from "./../Context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation()
  // Jodi user login kora na thake


  if (loading) {
    return <Loader></Loader>;
  }

  if (!user) {
    return <Navigate to="/login" state={location?.pathname} replace />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
