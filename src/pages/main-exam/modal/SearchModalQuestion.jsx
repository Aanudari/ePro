import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import bg from "../../../assets/background-blue.jpg";

function SearchModalQuestion({ show, setShow }) {
  const { activeMenu, TOKEN } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState();
  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json",
      },
      url: `${process.env.REACT_APP_URL}/v1/Pool/questions`,
    })
      .then((res) => {
        setLoading(false);
        setData(res.data.questionList);
      })
      .catch((err) => console.log(err));
  }, []);
  //   console.log(data);
  const filteredData = data?.filter((item) =>
    item.questionName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div
      className={`fixed ${
        activeMenu
          ? "top-[56px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)]"
          : "w-full h-full top-[56px] left-0"
      } 
      bg-black bg-opacity-50 flex justify-center items-center z-20
      `}
    >
      <div className="shrink w-[calc(100%)] h-[calc(100%)] bg-white flex flex-col">
        <div className="w-full min-h-[50px] bg-teal-700 flex justify-end items-center px-3 ">
          {/* <i className="bi bi-search text-2xl text-white"></i> */}
          <button
            onClick={() => {
              setShow(false);
            }}
            className="w-[20px] h-full "
          >
            <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
          </button>
        </div>
        <div className="h-full w-full rounded-b-lg p-3">
          <div className="h-[100px] w-full flex items-end gap-2 justify-center ">
            <div className="group">
              <input
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={
                  "custom-validation !w-full !border-b-[2px] !border-[#50a3a2] font-[400]"
                }
                type="text"
                required
              />

              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="">
                <i className="bi bi-search"></i> Асуултын утга ...
              </label>
            </div>
            <div className="px-2 py-1 rounded bg-gray-400 text-white font-[400] w-[40px] flex justify-center mb-9">
              {filteredData?.length}
            </div>
          </div>
          <div
            // style={{
            //   background: `url(${bg})`,
            // }}
            className="h-[calc(75%)] w-full bg-gray-100 border rounded shadow-inner overflow-scroll px-2 py-2 flex flex-col items-center"
          >
            {filteredData?.map((item, index) => {
              //   console.log(item);
              return (
                <div
                  key={item.questionId}
                  className={`border-t-[6px] border-l-[2px] border-r-[2px] border-[#50a3a2] rounded-lg relative bg-[#50a3a2] mt-2 w-[900px]`}
                >
                  <div className="px-3 text-white font-[400] text-[15px] py-1">
                    {item.categoryName}
                  </div>
                  <div
                    className={`w-full shadow-md py-3 px-3 font-[400]  bg-gray-50 flex flex-col transition rounded-lg pt-10 `}
                  >
                    <div className="flex justify-between gap-2">
                      <div className=" w-full flex items-start">
                        <span className="font-[500] mt-[2px]">
                          {index + 1}.
                        </span>

                        <div className="w-full">
                          <h6 className="mb-0 mt-1 ml-2 font-[400]">
                            {item.questionName}
                          </h6>
                          {/* <div
                            className={`${
                              item.qImgUrl !== ""
                                ? "border p-2 w-full mt-2 rounded flex justify-center bg-white"
                                : "hidden"
                            }`}
                          >
                            <img
                              className="w-[300px] h-[200px] mt-2"
                              src={`http://${item.qImgUrl}`}
                              alt=""
                            />
                          </div> */}
                        </div>
                      </div>

                      <div className="h-[32px] flex items-start mt-1 rounded-full border px-3 flex items-center bg-teal-500 text-white">
                        <span className="mb-0 font-[400] text-[15px]">
                          {data.points}
                        </span>
                        <span className="mb-0 font-[400] text-[15px] mt-0 ml-1">
                          оноо
                        </span>
                      </div>
                    </div>
                    <div>
                      {item.answers.map((item, index) => (
                        <div key={index} className="mt-2">
                          <h6 className=" font-[400] pl-3 flex items-center">
                            {item.isTrue === "1" ? (
                              <i className="bi bi-check-circle text-xl px-1 text-teal-500"></i>
                            ) : (
                              <i className="bi bi-circle text-xl px-1 text-gray-400"></i>
                            )}
                            <span className="ml-2 text-[14px] font-[400]">
                              {item.answerName}
                            </span>
                          </h6>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModalQuestion;
