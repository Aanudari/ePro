import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
function TrainingProgressCell({ data }) {
  const [uzeegui, setUzeegui] = useState([]);
  const [uzsen, setUzsen] = useState([]);
  function ProgressBar({ percentage, startAt = 0 }) {
    return (
      <>
        <div className="w-full h-4 bg-gray-300 rounded-full mt-3">
          <div
            style={{
              width: `${percentage >= startAt ? percentage : startAt}%`,
            }}
            className="w-3/4 h-full ml-1 font-bold text-center text-xs text-black bg-green-500 rounded-full transition-all duration-1000"
          >
            {Math.floor(percentage)}%
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="block m-auto">
      <div>
        <ProgressBar percentage={1} />
      </div>

      <ToastContainer />
    </div>
  );
}

export default TrainingProgressCell;
