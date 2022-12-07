import axios from "axios";

export const getCategoryPool = async () => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/v1/Pool/Category`,
  {
    headers: {
      "Authorization": `${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
  }
  });
  const getCategoryPool = response.data;
  return getCategoryPool;
};


export const getQuestionDetail = async () => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/v1/Exam/Variants/${localStorage.getItem("exam_id")}`,
  {
    headers: {
      "Authorization": `${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
  }
  });
  const getQuestionDetail = response.data;
  return getQuestionDetail;
};

export const examList = async () => {
  const response = await axios.get(`${process.env.REACT_APP_URL}/v1/Exam`,
  {
    headers: {
      "Authorization": `${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
  }
  });
  const examList = response.data;
  return examList;
};
