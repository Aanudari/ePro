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

function CreateTraining() {
  const data = {
    name: `surgaltiin ner`,
    description: `tailbar`,
    fileUrl: `file URL uusgeh api aar file aa oruulaad urlin hadgalna ene hesegt`,
    duration: `minutin too 40min`,
    teacher: `Garaar oruulna`,
    tCategory: `surgaltiin categoryg songood ID g n avna ehleed category uusgene`,
    sessionType: ` tanhim-1 online-2 toog n yvuulna`,
    startDate: `surgalt ehleh odor tsag 20121212677878`,
    endDate: `surgal duush`,
    location: `tanhimaar songoson uyd bairshil oruulna online aar bol oor teamseer gdg ch ymu `,
    addTrainingDevs: [
      //surgalt hen2 uzeh ve
      {
        departmentId: `alba songoltoor ID g n avna`,
        unitId: `heltesiin id null bj blno`,
        devId: `device ID songohguigeer yvuulj bolno`,
      },
    ],
  };

  return (
    <div className="w-full h-full bg-gray-50">
      <Navigation />
      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Сургалт үүсгэх
            </p>
            <div className="my-2 flex sm:flex-row flex-col">
              <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <i className="bi bi-search" />
                </span>
                <input
                  name="search"
                  // onChange={handleOnChange}
                  placeholder="Хайлт"
                  className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-black focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          aaaaaa
        </div>
      </div>
    </div>
  );
}

export default CreateTraining;
