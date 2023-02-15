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
function RatedUsers() {
  const location = useLocation();
  const { TOKEN, activeMenu } = useStateContext();
  const navigate = useNavigate();
  const { width } = getWindowDimensions();
  const tr = location.state.data;
  const [ratedUsers, setRatedUsers] = useState([]);
  const [filteredList, setFilteredList] = useState(ratedUsers);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingReport/training/rated?trainingId=${tr.trainingId}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess === true) {
          setRatedUsers(res.data.getRatingQuestionAnswers);
        }
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const searchList = ratedUsers.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(searchList);
  };
  console.log(tr.trainingId);
  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <Navigation />
      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <h1 className="text-xl font-bold text-gray-900 sm:text-xl">
            Үнэлгээ хийгдсэн эсэх
          </h1>
        </div>

        <div className="sm:flex items-center justify-between p-2">
          <div className="flex items-center sm:justify-between sm:gap-4">
            <div className="relative hidden sm:block">
              <input
                value={searchQuery}
                onChange={handleSearch}
                type="text"
                name="search"
                className="w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 flex-1 py-2 px-4 bg-white  text-gray-700 placeholder-gray-400 shadow-sm text-base"
                placeholder="нэр"
              />

              <button
                type="button"
                className="absolute top-1/2 right-1 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
              >
                <i className="bi bi-search" />
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0 sm:justify-end md:justify-end">
            <button
              onClick={() => navigate("/training-rating")}
              className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
              type="submit"
            >
              Exit
            </button>
          </div>
        </div>

        {ratedUsers.length === 0 ? (
          <p className="p-4 text-left text-sm font-medium">
            Үнэлгээ хийгдээгүй байна.
          </p>
        ) : (
          ratedUsers?.map((data, index) => (
            <div key={index} className="p-2">
              <div className="max-w-full mx-auto overflow-hidden rounded-lg shadow-lg lg:max-w-none lg:flex">
                aaa
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default RatedUsers;
