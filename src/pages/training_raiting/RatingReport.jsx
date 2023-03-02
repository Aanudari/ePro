import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import DatePicker from "react-datepicker";
import { logout } from "../../service/examService";
import getWindowDimensions from "../../components/SizeDetector";
function RatingReport() {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const selectedRate = location.state.data;
  const [questionResults, setQuestionResults] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingReport/training/QuestionReport/${selectedRate.trainingId}`,
    })
      .then((res) => {
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
        if (res.data.isSuccess === true) {
          setQuestionResults(res.data.questionResults);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const separatedArr = questionResults.reduce((acc, obj) => {
    const { questionType } = obj;
    if (!acc[questionType]) {
      acc[questionType] = [];
    }
    acc[questionType].push(obj);
    return acc;
  }, {});
  const type1Arr = separatedArr["1"];
  const type2Arr = separatedArr["2"];
  console.log(selectedRate);
  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <Navigation />
      <div className="sm:px-6 w-full">
        <button
          onClick={() => navigate("/training-rating")}
          className="bg-white border border-white p-2 rounded text-gray-700 flex items-center focus:outline-none focus:shadow-outline "
        >
          <svg width="24" height="24" viewBox="0 0 16 16">
            <path
              d="M9 4 L5 8 L9 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          <span className="mx-2">Буцах</span>
        </button>
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-sm md:text-xl lg:text-xl font-bold leading-normal text-gray-800">
              Үнэлгээний тайлан
            </p>
          </div>
        </div>
        aaa
      </div>

      <ToastContainer />
    </div>
  );
}

export default RatingReport;
