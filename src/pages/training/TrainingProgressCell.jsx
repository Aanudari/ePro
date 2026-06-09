import React from "react";
import { ToastContainer } from "react-toastify";

function TrainingProgressCell({ data }) {
  function ProgressBar({ percentage, startAt = 0 }) {
    return (
      <div className="w-full h-4 mt-3 bg-gray-300 rounded-full">
        <div
          style={{
            width: `${percentage >= startAt ? percentage : startAt}%`,
          }}
          className="h-full ml-1 text-xs font-bold text-center text-black transition-all duration-1000 bg-green-500 rounded-full"
        >
          {Math.floor(percentage)}%
        </div>
      </div>
    );
  }

  return (
    <div className="block m-auto">
      <ProgressBar percentage={1} />
      <ToastContainer />
    </div>
  );
}

export default TrainingProgressCell;
