import React from "react";
import Navigation from "../../components/Navigation";
import TrainCell from "../../components/sub-components/TrainCell";

function Traingings() {
  return (
    <div className="w-full h-screen bg-gray-50">
      <Navigation />
      <div className="h-screen px-5 py-3">
        <div className="w-full h-full bg-white rounded-lg p-5 flex flex-col gap-2">
          <TrainCell />
          <TrainCell />
          <TrainCell />
          <TrainCell />
        </div>
      </div>
    </div>
  );
}

export default Traingings;
