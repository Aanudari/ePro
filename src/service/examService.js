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
  const response = await axios.get(`${process.env.REACT_APP_URL}/v1/ExamNew`,
    {
      headers: {
        "Authorization": `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }
    });
  const examList = response.data;
  return examList;
};
export const addCategoryPool = async (data) => {
  const response = await axios.post(`${process.env.REACT_APP_URL}/v1/Pool/add/Category`,
  data,
  {
      headers: {
        "Authorization": `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    },
  );
  const addCategoryPool = response.data;
  return addCategoryPool;
};

export const deleteCategoryPool = async (data) => {
  const response = await axios.delete(`${process.env.REACT_APP_URL}/v1/Pool/${data}`,
  {
      headers: {
        "Authorization": `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    },
  );
  const deleteCategoryPool = response.data;
  return deleteCategoryPool;
};