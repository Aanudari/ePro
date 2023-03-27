import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { logout } from "../service/examService";
export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, roleId } = useStateContext();
  if (!user) {
    return <Navigate to="/" />;
  }
  return allowedRoles.includes(Number(roleId)) ? (
    children
  ) : (
    <div className="w-full flex flex-col justify-center items-center h-screen bg-teal-100">
      <span className="p-10 text-2xl font-[400]">
        Танд энэ хуудас руу хандах эрх олгогдоогүй байна!
      </span>
      <i className="bi bi-emoji-frown text-2xl"></i>
      <button
        onClick={() => {
          logout();
        }}
        className="custom-btn btn-13 mt-10"
      >
        Гарах
      </button>
    </div>
  );
};
