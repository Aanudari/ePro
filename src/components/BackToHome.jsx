import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";

export const CheckLogin = ({ children }) => {
  const { user } = useStateContext();
  console.log(user)
  if (user) {
    return <Navigate to="/home" />;
  }
  return children;
};
