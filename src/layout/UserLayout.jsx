import UINavigation from "../components/UINavigation";

function UserLayout({children}) {
    return ( 
        <div className="w-full">
            <UINavigation/>
            {children}
        </div>
     );
}

export default UserLayout;