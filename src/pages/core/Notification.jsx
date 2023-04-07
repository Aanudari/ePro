import React, { useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import NotiCell from "../../components/sub-components/NotiCell";
import UserSub from "../../components/sub-components/UserSub";
import axios from "axios";
import Select from "react-select";
import { useStateContext } from "../../contexts/ContextProvider";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function Notification() {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [pageStatus, setpageStatus] = useState("1");
  const [users, setUsers] = useState();
  const { TOKEN } = useStateContext();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/User`,
    })
      .then((res) => setUsers(res.data.result))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="w-full h-screen bg-gray-50 relative">
      <Navigation />
      <div className="h-screen px-5 py-3">
        <div className="w-full h-full bg-white rounded-lg p-5">
          <div className="flex gap-2">
            <span
              onClick={() => {
                setpageStatus("1");
              }}
              className={
                pageStatus === "1"
                  ? "font-[500] border-b-[2px] border-red-400 pb-1 text-[18px] p-2 cursor-pointer "
                  : "font-[500] pb-1 text-[18px] p-2 cursor-pointer "
              }
            >
              Мэдэгдлүүд
            </span>
            <span
              onClick={() => {
                setpageStatus("2");
              }}
              className={
                pageStatus === "2"
                  ? "font-[500] border-b-[2px] border-green-400 pb-1 text-[18px] p-2 cursor-pointer "
                  : "font-[500] pb-1 text-[18px] p-2 cursor-pointer "
              }
            >
              Мэдэгдэл илгээх
            </span>
          </div>
          {/* Notification Cell */}

          {pageStatus === "1" ? (
            <div className="mt-2 flex flex-col gap-2 relative">
              <NotiCell />
              <NotiCell />
              <NotiCell />
            </div>
          ) : (
            <div className="flex gap-2 mt-5 flex flex-wrap">
              {users.map((e) => (
                <UserSub data={e} />
              ))}
            </div>
          )}
          <div className="App">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
