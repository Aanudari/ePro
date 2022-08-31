import React from "react";
import Navigation from "../../components/Navigation";

function ExamResult() {
  return (
    <div className="w-full h-screen bg-gray-50">
      <Navigation />
      <div className="h-screen px-5 py-3">
        <div className="w-full h-full bg-white rounded-lg p-5">
          <div className="bg-yellow-400 w-1/3 h-20 flex items-center justify-center rounded-lg text-white cursor-pointer hover:shadow font-medium">
          Миний дүн 
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamResult;
