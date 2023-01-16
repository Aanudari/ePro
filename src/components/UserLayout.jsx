import UINavigation from "./UINavigation";

function UserLayout({ children }) {
  return (
    <div className="w-full relative">
      <div className="relative w-full">
        <UINavigation />
      </div>
      {children}
    </div>
  );
}

export default UserLayout;
