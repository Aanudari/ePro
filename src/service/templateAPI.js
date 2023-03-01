import axios from "axios";
const token = localStorage.getItem("token");
const instance = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
});
export default {
  getTemaplates: () =>
    instance({
      method: "GET",
      url: "/v1/RatingTemplateNew/getTemplateList",
      transformResponse: [
        function (data) {
          const json = JSON.parse(data);
          return json;
        },
      ],
    }),
  getTemaplateInside: (id) =>
    instance({
      method: "GET",
      url: `/v1/RatingTemplateNew/getTemplateInfo/${id}`,
      transformResponse: [
        function (data) {
          const json = JSON.parse(data);
          return json;
        },
      ],
    }),
};
