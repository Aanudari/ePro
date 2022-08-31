import React from "react";
import Navigation from "../../components/Navigation";

function TakeExam() {
  return (
    <div className="w-full h-screen bg-gray-50">
      <Navigation />
      <div className="h-screen px-5 py-3">
        <div className="w-full h-full bg-white rounded-lg p-5">
          <div className="bg-green-400 w-1/3 h-20 flex items-center justify-center rounded-lg text-white cursor-pointer hover:shadow font-medium">
          Идэвхитэй шалгалтын жагсаалт үзэх 
          </div>
        </div>
      </div>
    </div>
  );
}

export default TakeExam;
