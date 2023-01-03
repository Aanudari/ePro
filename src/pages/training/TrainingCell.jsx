import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
function TrainingCell({ data, id }) {
  const [trains, setTrains] = useState([]);
  const navigate = useNavigate();
  const { TOKEN } = useStateContext();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `http://192.168.10.248:9000/v1/Training`,
    })
      .then((res) => {
        setTrains(res.data.trainingList);
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  let filtered = trains?.filter((item, index) => {
    return item.tCategory == id;
  });

  const checking = () => {
    if (filtered?.length == null) {
      notification.error(`Хоосон байна.`);
    } else {
      navigate("/training-list", {
        state: { data: filtered },
      });
    }
  };
  return (
    <div className="w-full sm:w-1/3 md:w-1/3 xl:w-1/4 p-2">
      <a
        onClick={checking}
        className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
      >
        <div className="p-2">
          <h5 className="mt-2 mb-2 font-bold">{data.name}</h5>
        </div>
        <div className="p-4 flex items-center text-sm text-gray-600">
          <span className="ml-2">Сургалтын тоо: {filtered?.length}</span>
        </div>
      </a>
      <ToastContainer />
    </div>
  );
}

export default TrainingCell;
