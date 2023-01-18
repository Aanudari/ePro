import UserLayout from "../../components/UserLayout";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
function UserTraining() {
  const { TOKEN, deviceId } = useStateContext();
  const navigate = useNavigate();
  const [userTrain, setUserTrain] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/Training`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        if (res.data.isSuccess == true) {
          setUserTrain(res.data.trainingList);
        }
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const navigatePlayer = (data) => {
    navigate("/player", {
      state: { data: data },
    });
  };
  console.log(deviceId);

  return (
    <UserLayout>
      {userTrain.length === 0 ? (
        <p className="p-4 text-start text-sm font-medium">
          Танд сургалт хувиарлагдаагүй байна.
        </p>
      ) : (
        userTrain.map((data, i) => (
          <div key={i}>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 ">
              <div className="w-full max-w-xs p-6 overflow-hidden bg-white shadow-lg rounded-xl dark:bg-gray-800  bg-white rounded-xl  shadow-lg shadow-md overflow-hidden md:max-w-2xl  transform hover:scale-105 duration-500 ease-in-out">
                <div className="flex items-center justify-between mb-4 space-x-12 ">
                  {data.startedWatch === null ? (
                    <span className="flex items-center px-2 py-1 text-xs font-semibold text-red-400 border-2 border-rose-600 rounded-md absolute top-3 right-3">
                      ҮЗЭЭГҮЙ
                    </span>
                  ) : (
                    <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-700 border-2 border-green-600 rounded-md absolute top-3 right-3  ">
                      ҮЗСЭН
                    </span>
                  )}
                </div>

                <p className="mb-2 text-lg text-gray-800 dark:text-white font-bold mt-2">
                  {data.name}
                </p>
                <p className="text-sm font-normal text-gray-400">
                  {data.description}
                </p>

                <div className="dark:text-white">
                  <div className="flex items-center justify-between  text-sm border-b border-gray-200 md:space-x-24">
                    {data.sessionType === "1" ? <p>Тэнхим</p> : <p>Онлайн</p>}
                    {/* <div className="flex items-end text-xs">aaa</div> */}
                  </div>
                </div>

                {/* <div className="flex items-center justify-between p-2 my-6 bg-blue-100 rounded">
                  <div className="flex items-start justify-between w-full">
                    <p className="flex-grow w-full text-2xl text-gray-700">
                      <span className="font-light text-gray-400 text-md">
                        $
                      </span>
                      4,500
                      <span className="text-sm font-light text-gray-400">
                        /Month
                      </span>
                    </p>
                    <span className="flex-none px-3 py-1 text-sm text-indigo-500 border border-indigo-500 rounded-full">
                      Full time
                    </span>
                  </div>
                </div> */}

                <button
                  onClick={() => {
                    navigatePlayer(data);
                  }}
                  type="button"
                  className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Сургалт үзэх
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      <ToastContainer />
    </UserLayout>
  );
}

export default UserTraining;
