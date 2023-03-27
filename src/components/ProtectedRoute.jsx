import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import Navigation from "../components/Navigation";
export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, roleId } = useStateContext();
  if (!user) {
    return <Navigate to="/" />;
  }
  return allowedRoles.includes(Number(roleId)) ? (
    children
  ) : (
    <div className="w-full">
      <Navigation />
      <div class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div class="relative">
            <div class="absolute">
              <div class="">
                <h1 class="ml-1 text-gray-800 font-bold text-sm">
                  Танд энэ хуудас руу хандах эрх олгогдоогүй байна!
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
        </div>
      </div>
    </div>
  );
};
