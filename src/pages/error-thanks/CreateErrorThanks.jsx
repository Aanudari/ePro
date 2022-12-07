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
  const [workers, setWorkers] = useState([]);
  const [selectedOptiondepartment, setSelectedOptiondepartment] =
    useState(null);

  const [selectedOptionorg, setSelectedOptionorg] = useState(null);
  const [selectedOptionWorkers, setSelectedOptionWorkers] = useState(null);
  const [departmentID, setDepartmentID] = useState();
  const [orgID, setOrgID] = useState();
  const [workersID, setWorkersID] = useState();
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
  if (selectedOptiondepartment) {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `http://192.168.10.248:9000/v1/User/org/${selectedOptiondepartment.id}`,
    })
      .then((res) => {
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        } else {
          setOrg(res.data.organizations);
          setDepartmentID(selectedOptiondepartment.id);
        }
      })
      .catch((err) => console.log(err));
  }
  if (selectedOptionorg) {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `http://192.168.10.248:9000/v1/User/unit/devices?unitId=${selectedOptionorg.id}`,
    })
      .then((res) => {
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        } else {
          setWorkers(res.data.unitDevices);
          setOrgID(selectedOptionorg.id);
        }
      })
      .catch((err) => console.log(err));
  }
  if (selectedOptionWorkers) {
    setWorkersID(selectedOptionWorkers.deviceId);
  }
  const [inputValues, setInputValue] = useState({
    department: departmentID,
    unit: orgID,
    deviceId: workersID,
    complain: location.state.type.category,
    complainType: "gomdli trl garaar",
    description: "gmdl del txt",
    rule: "juram",
    too: "1-5",
    createdBy: deviceId,
  });
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
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-1">
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
                <div className="md:col-span-2">
                  <label>Харьяалагдах хэлтэс</label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1 ">
                    <Select
                      className="outline-none  w-full"
                      options={department}
                      defaultValue={selectedOptiondepartment}
                      onChange={setSelectedOptiondepartment}
                      onSelectChange={(item) =>
                        console.log("use your custom handler here", item)
                      }
                      noOptionsMessage={({ inputValue }) =>
                        !inputValue && "Сонголт хоосон байна"
                      }
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                    />
                  </div>
                </div>
                <div className="md:col-span-1">
                  <label>Ажлын байр</label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <Select
                      options={org}
                      defaultValue={selectedOptionorg}
                      onChange={setSelectedOptionorg}
                      className="outline-none  w-full"
                      noOptionsMessage={({ inputValue }) =>
                        !inputValue && "Сонголт хоосон байна"
                      }
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                    />
                  </div>
                </div>
                <div className="md:col-span-1">
                  <label>Ажилтны нэр</label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <Select
                      options={workers}
                      defaultValue={selectedOptionWorkers}
                      onChange={setSelectedOptionWorkers}
                      className="outline-none  w-full"
                      noOptionsMessage={({ inputValue }) =>
                        !inputValue && "Сонголт хоосон байна"
                      }
                      getOptionLabel={(option) => option.firstName}
                      getOptionValue={(option) => option.deviceId}
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label>Гомдлын төрөл</label>
                  <input
                    type="text"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                </div>
                <div className="md:col-span-2">
                  <label>Журам</label>
                  <input
                    type="text"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                </div>
                <div className="md:col-span-1">
                  <label>Алдаа</label>
                  <input
                    type="text"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                </div>
                <div className="md:col-span-5">
                  <label>Гомдлын дэлгэрэнгүй</label>
                  <textarea
                    type="text"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  />
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
