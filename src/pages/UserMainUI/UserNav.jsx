import { useNavigate } from "react-router-dom";

function UserNav() {
  const navigate = useNavigate();
  return (
    <header className="header fixed">
      <div className="header-content responsive-wrapper">
        <div className="header-logo">
          <a href="#">
            <div>
              <img src="https://assets.codepen.io/285131/untitled-ui-icon.svg" />
            </div>
            {/* <img src="https://assets.codepen.io/285131/untitled-ui.svg" /> */}
            <h6 className="text-black text-xl ml-2 vietnam-pro mb-0">E-PRO</h6>
          </a>
        </div>
        <div className="header-navigation">
          <nav className="header-navigation-links">
            {/* <a href="#"> Нүүр </a> */}
            <a href="#"> Home </a>
            <a
              className="cursor-pointer"
              onClick={() => {
                navigate("/user-error-thanks");
              }}
            >
              {" "}
              Сургалт{" "}
            </a>
            <a
              className="cursor-pointer"
              onClick={() => {
                navigate("/user-error-thanks");
              }}
            >
              {" "}
              Бүртгэл{" "}
            </a>
          </nav>
          <div className="header-navigation-actions">
            {/* <a href="#" className="button">
              <i className="ph-lightning-bold"></i>
              <span>Upgrade now</span>
            </a> */}
            <a href="#" className="icon-button">
              <i className="bi bi-gear-wide"></i>
            </a>
            <a href="#" className="icon-button">
              <i className="bi bi-bell-fill"></i>
            </a>
            <a href="#" className="avatar ">
              <img src="user2.png" alt="" />
            </a>
          </div>
        </div>
        <a href="#" className="button">
          <i className="ph-list-bold"></i>
          <span>Menu</span>
        </a>
      </div>
    </header>
  );
}

export default UserNav;
