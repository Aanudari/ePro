import React from "react";
import Navigation from "../../components/Navigation";
import ValCell from "../../components/sub-components/ValCell";
import { useStateContext } from "../../contexts/ContextProvider";
function Dashboard() {
  const { showTop, setShowTop } = useStateContext();
  return (
    <div className="w-full min-h-[calc(100%-54px)] bg-gray-50 relative">
      <Navigation />
      <div className="h-[calc(100%-54px)] px-5 py-3"></div>
      {showTop ? (
        <div className="w-1/2 h-full right-0 top-0 bg-white fixed z-cus p-5 side-commend">
          <button
            onClick={() => {
              setShowTop(!showTop);
            }}
            className="px-2 py-1 border bg-red-500  text-white"
          >
            Буцах
          </button>
          <div className="bg-gray-100 w-full h-full my-2 rounded p-4 flex flex-col gap-4">
            <div className="bg-white h-1/3 rounded p-4">
              <h6>Үнэлгээний тухай:</h6>
              <div className="w-full mt-2 flex border p-2">
                <div>
                  <span>Огноо: 2020:09:10</span>
                  <span>Үнэлгээ хийсэн: Хэрэглэгч</span>
                </div>
                <div>
                  <span>Огноо: 2020:09:10</span>
                  <span>Үнэлгээ хийсэн: Хэрэглэгч</span>
                </div>
              </div>
            </div>
            <div className="bg-white h-1/2 rounded p-4">
              <h6>Сэтгэгдэл:</h6>
              <div className="text-[14px]">Сэтгэгдэл байхгүй байна.</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Dashboard;
