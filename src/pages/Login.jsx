import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const navigateToTest = (e) => {
    e.preventDefault();
    navigate("/card");
  };
  return (
    <div class="wrapper">
      <div class="container">
        <h1 className="text-white">Сургалт үнэлгээний программ</h1>
        <form class="form">
          <input type="text" placeholder="Нэвтрэх нэр" />
          <input type="password" placeholder="Нууц үг" />
          <button
            onClick={navigateToTest}
            type="submit"
            id="login-button"
            className="bg-white"
          >
            Нэвтрэхx
          </button>
        </form>
      </div>

      <ul class="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}

export default Login;
