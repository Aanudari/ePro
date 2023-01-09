import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";

export const CheckLogin = ({ children }) => {
  const { user } = useStateContext();
  if (user ? user.role_id === "199" : null) {
    return <Navigate to="/home" />;
  } else if (user) {
    return <Navigate to="/user-main" />;
  } else return children;
};
