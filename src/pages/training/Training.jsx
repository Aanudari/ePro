import TrainCell from "../../components/sub-components/TrainCell";
import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { arraySearch } from "../../service/searchArray";
import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
function Traingings() {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const handleCreate = () => {
    navigate("/create-training");
  };
  const navigateFiles = () => {
    navigate("/training-files");
  };
  const navigateCategory = () => {
    navigate("/training-category");
  };
  return (
    <div className="w-full h-screen bg-gray-50">
      <Navigation />
      <div className="h-screen px-5 py-3">
        <div className="w-full h-full bg-white rounded-lg p-5 flex flex-col gap-2">
          <button onClick={handleCreate}>ADD</button>
          <button onClick={navigateFiles}>Training files</button>
          <button onClick={navigateCategory}>Training category</button>
          {/* <TrainCell />
          <TrainCell />
          <TrainCell />
          <TrainCell /> */}
        </div>
      </div>
    </div>
  );
}

export default Traingings;
