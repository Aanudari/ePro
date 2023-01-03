import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import TrainingCell from "./TrainingCell";
import { notification } from "../../service/toast";
function TrainingIndex() {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `http://192.168.10.248:9000/v1/Training/category`,
    })
      .then((res) => {
        setCategory(res.data.trainingCatList);

        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage == "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);

  //   const arr = [];
  //   const handlePageCount = () => {
  //     for (let x = 0; x < trains.length; x++) {
  //       let id = trains[x].tCategory;
  //       if (ID == id) {
  //         arr.push(trains[x]);
  //       }
  //     }
  //   };
  //   handlePageCount();
  const checkCategory = () => {
    if (category === null) {
      notification.error("Ангилал хоосон байна.");
    } else {
      navigate("/create-training");
    }
  };
  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <Navigation />
      <div className="w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Сургалт
            </p>
          </div>
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center"></div>
            <button
              className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded 
               text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={checkCategory}
            >
              <i className="bi bi-plus text-bold" />
              Сургалт үүсгэх
            </button>
          </div>
        </div>
        <div className=" text-gray-900 font-sans p-6">
          <div className="flex flex-wrap -mx-4">
            {category ? (
              category.map((data, index) => (
                <TrainingCell key={index} data={data} id={data.id} />
              ))
            ) : (
              <p className="p-4 text-center text-sm font-medium">
                Сургалтын ангилал үүсээгүй байна.
                <a className="underline" href="/training-category">
                  {" "}
                  Ангилал үүсгэх &rarr;{" "}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TrainingIndex;
