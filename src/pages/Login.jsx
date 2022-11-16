import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";

function Login() {
  const { setUser, setisAuthenticated } = useStateContext();
  const navigate = useNavigate();
  const redirect = (data) => {
    switch (data.role_id) {
      case '1':
        navigate("/levelone-ui-take-exam")
        break;
      case '199':
        navigate("/home")
        break;
    }
    setUser(data);
  };

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [checkEmpty, setcheckEmpty] = useState(false);
  const [passEmpty, setpassEmpty] = useState(false);
  const data = {
    username: username,
    password: password,
  };
  const [alert, setalert] = useState(false);
  const navigateToTest = (e) => {
    e.preventDefault();
    if (username.length === 0) {
      setcheckEmpty(true);
    } else if (password.length === 0) {
      setpassEmpty(true);
    } else {
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        url: `http://192.168.10.248:9000/v1/Auth/login`,
        data: JSON.stringify(data),
      })
        .then((res) => {
          if (res.data.result === "true") {
            redirect(res.data);
            setisAuthenticated(true);
            localStorage.setItem("token", res.data.token)
          } else {
            setalert(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setalert(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [alert]);
  return (
    <div className="wrapper">
      <div className="container flex flex-col items-center justify-end md:justify-start">
        <h1 className="text-white !text-[45px]">E-Pro систем</h1>
        <form className="form">
          <input
            type="text"
            placeholder="Нэвтрэх нэр"
            onChange={(e) => {
              setusername(e.target.value);
              setcheckEmpty(false);
            }}
            id={checkEmpty === true ? "border-red" : null}
          />
          <input
            type="password"
            placeholder="Нууц үг"
            onChange={(e) => {
              setpassword(e.target.value);
              setpassEmpty(false);
            }}
            id={passEmpty === true ? "border-red" : null}
          />
          <button
            onClick={navigateToTest}
            type="submit"
            id="login-button"
            className="bg-white"
          >
            Нэвтрэх
          </button>
          <div className="relative bg-red-100 w-[300px] flex justify-center bg-red-100">
            {""}
            {alert ? (
              <p className="absolute slice-top top-[10px] w-full rounded text-[15px] text-white h-full">
                Нэвтрэх нэр эсвэл нууц үг буруу байна.
              </p>
            ) : null}
          </div>
        </form>
      </div>

      <ul className="bg-bubbles">
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
