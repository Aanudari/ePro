import axios from "axios";

export const fetchComplain = async () => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/v1/User/role/4`);
  const complainOperators = response.data;
  return complainOperators;
};

export const fetchLevelOne = async () => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/v1/User/role/1`);
  const levelOneOperators = response.data;
  return levelOneOperators;
};