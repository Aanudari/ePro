import axios from "axios";

let token = localStorage.getItem("token");
console.log(token);
const instance = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
});
export default {
  getData: () =>
    instance({
      method: "GET",
      url: "/v1/User",
      transformResponse: [
        function (data) {
          const json = JSON.parse(data);
          data = json;
          return data;
        },
      ],
    }),
};
