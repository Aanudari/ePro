import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, allRoles } = useStateContext();
  if (!user) {
    return <Navigate to="/" />;
  }
  return allRoles.includes(Number(allowedRoles)) ? children : null
};
