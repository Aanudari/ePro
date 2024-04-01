import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";

export const CheckLogin = ({ children }) => {
  const { user } = useStateContext();
  const adminRoles = ["10", "2", "6", "14", "19", "29", "8", "9"];
  if (user ? adminRoles.includes(user.job_id) : null) {
    return <Navigate to="/exam-dashboard" />;
  } else if (user) {
    return <Navigate to="/user-exam" />;
  } else return children;
};
