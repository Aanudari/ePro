import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
function CreateErrorThanks() {
  const location = useLocation();
  const { TOKEN, deviceId } = useStateContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const type = location.state.type.category;
  const [startDate, setStartDate] = useState(new Date());
  const [department, setDepartment] = useState();
  const [org, setOrg] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `http://192.168.10.248:9000/v1/User/department`,
    })
      .then((res) => {
        setDepartment(res.data.departments);
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  if (selectedOption) {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `http://192.168.10.248:9000/v1/User/org/${selectedOption.id}`,
    })
      .then((res) => {
        setOrg(res.data.result);
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="w-full h-screen bg-gray-50">
      <Navigation />
      <div className="w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              {type}
            </p>
          </div>
        </div>
        <div className="p-4 container max-w-screen-lg mx-auto">
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
                <div className="mb:col-span-1">
                  <label>Огноо</label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <DatePicker
                      className="text-center text-sm  outline-none  focus:ring-0 bg-transparent"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      dateFormat="yyyy, MM, dd"
                    />
                  </div>
                </div>
                <div className="mb:col-span-1">
                  <label for="state">Харьяалагдах хэлтэс</label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1 ">
                    <Select
                      className="outline-none  w-full"
                      options={department}
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      noOptionsMessage={({ inputValue }) =>
                        !inputValue && "Сонголт хоосон байна"
                      }
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                    />
                  </div>
                </div>
                <div className="mb:col-span-2">
                  <label for="state">Ажлын байр</label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <Select
                      options={department}
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      className="outline-none  w-full"
                      noOptionsMessage={({ inputValue }) =>
                        !inputValue && "Сонголт хоосон байна"
                      }
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                    />
                  </div>
                </div>

                <div className="col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateErrorThanks;
