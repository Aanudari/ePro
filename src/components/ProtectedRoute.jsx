import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import Navigation from "./Navigation";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, allRoles, roleId } = useStateContext();
  if (!user) {
    return <Navigate to="/" />;
  }
  return allowedRoles.includes(Number(roleId)) ? children : <div className="w-full"><Navigation /><span className="p-10">No permission!</span></div>
};
