import UINavigation from "../components/UINavigation";

function UserLayout({ children }) {
  return (
    <div className="w-full">
      <div className="relative w-full">
        {/* <div className="h-[60px]"></div> */}
        <UINavigation />
      </div>
      {children}
    </div>
  );
}

export default UserLayout;
