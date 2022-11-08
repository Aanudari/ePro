import axios from "axios";
import {useNavigate} from "react-router-dom";

export const getRequest = axios.create({
    baseUrl: `${process.env.REACT_APP_URL}/api/User/role/1`,
    headers: {
        "Content-Type": "application/json",
  },
});

export const Logout = () => {
    const navigate = useNavigate();
    localStorage.clear();
    sessionStorage.clear()
    navigate("/");
    window.location.reload();
};
