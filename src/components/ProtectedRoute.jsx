import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import Navigation from "./Navigation";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, roleId } = useStateContext();
  if (!user) {
    return <Navigate to="/" />;
  }
  return allowedRoles.includes(Number(roleId)) ? children : <div className="w-full pt-3"><Navigation /><span className="p-10">Танд энэ хуудас руу хандах эрх олгогдоогүй байна!</span></div>
};