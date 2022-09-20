import React from "react";
import Navigation from "../../components/Navigation";
import Demo from "./demo";

function CreateTraining() {
  return (
    <div className="w-full h-full bg-gray-50">
      <Navigation />
      <div className="h-full">
        <Demo />
      </div>
    </div>
  );
}

export default CreateTraining;
