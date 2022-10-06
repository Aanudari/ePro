import axios from "axios";
export const getRequest = axios.create({
    baseUrl: `${process.env.REACT_APP_URL}/api/User/role/1`,
    headers: {
        "Content-Type": "application/json",
  },
});