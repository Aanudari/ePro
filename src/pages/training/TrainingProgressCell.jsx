import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";

function TrainingProgressCell({ data }) {
  const [trains, setTrains] = useState([]);
  const navigate = useNavigate();
  const { TOKEN } = useStateContext();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  function ProgressBar({ percentage, startAt = 0 }) {
    return (
      <>
        <div class="w-full h-4 bg-gray-400 rounded-full mt-3">
          <div
            style={{
              width: `${percentage >= startAt ? percentage : startAt}%`,
            }}
            className="w-3/4 h-full ml-1 font-bold text-center text-xs text-white bg-green-500 rounded-full transition-all duration-1000"
          >
            {percentage}%
          </div>
        </div>
      </>
    );
  }
  const [watchedUsers, setWatchedUsers] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        accept: "text/plain",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingReport/training/watched?trainingId=${data.id}`,
    })
      .then((res) => {
        if (res.data.isSuccess == true) {
          setWatchedUsers(res.data.watchedList);
        }
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage == "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  let nowatch = watchedUsers?.filter((item, index) => {
    return item.hugatsaa != "";
  });

  return (
    <div class="w-full p-3 bg-white ">
      <div class="block m-auto">
        <div>
          <span class="inline-block text-sm  font-bold">
            Үзсэн :<span class="font-bold  ml-1 ">{nowatch.length}</span>/
            {data.trainingDevs.length}
          </span>
        </div>

        <div>
          <ProgressBar
            percentage={(nowatch.length * 100) / data.trainingDevs.length}
          />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default TrainingProgressCell;
