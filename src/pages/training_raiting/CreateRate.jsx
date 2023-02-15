import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import DatePicker from "react-datepicker";
import { logout } from "../../service/examService";
import getWindowDimensions from "../../components/SizeDetector";
function CreateRate() {
  const location = useLocation();
  const { TOKEN, activeMenu } = useStateContext();
  const navigate = useNavigate();
  const { width } = getWindowDimensions();
  const [step, setStep] = useState(0);
  const [trains, setTrains] = useState([]);
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
        }
        if (res.data.isSuccess === true) {
          setTrains(res.data.trainingList);
        }
        // console.log(trains);
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const [checkEmpty1, setcheckEmpty1] = useState(false);
  const [checkEmpty2, setcheckEmpty2] = useState(false);
  const [checkEmpty3, setcheckEmpty3] = useState(false);
  const [checkEmpty11, setcheckEmpty11] = useState(false);
  const format = "YYYYMMDDHHmmss";
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    trainingId: "",
    beginDate: "",
    endDate: "",
  });
  const [radioFields, setRadioFields] = useState([{ answer: "", points: "" }]);
  const [questionFields, setQuestionFields] = useState([
    {
      questionType: "1",
      questionName: "",
      trRatingAnswer: [radioFields],
    },
  ]);
  const [questionData, setQuestionData] = useState({
    ratingId: "",
    questions: questionFields,
  });
  console.log(questionFields);
  const handleRadioChange = (event, index) => {
    let data = [...radioFields];
    data[index][event.target.name] = event.target.value;
    setRadioFields(data);
  };
  const addRadioFields = () => {
    let object = {
      answer: "",
      points: "",
    };
    setRadioFields([...radioFields, object]);
  };
  const removeRadioFields = (index) => {
    let data = [...radioFields];
    data.splice(index, 1);
    setRadioFields(data);
  };
  const handleQuestionChange = (event, ind) => {
    let data = [...questionFields];
    data[ind][event.target.name] = event.target.value;
    setQuestionFields(data);
  };
  const addQuestionFields = () => {
    let object = {
      answer: "",
      points: "",
    };
    setQuestionFields([...questionFields, object]);
  };
  const removeQuestionFields = (index) => {
    let data = [...questionFields];
    data.splice(index, 1);
    setQuestionFields(data);
  };
  const FormTitles = ["Ерөнхий", "1-р хэсэг", "2-р хэсэг"];
  const cht = trains?.find((obj) => obj.id === formData?.trainingId);
  const StepDisplay = () => {
    if (step === 0) {
      return (
        <div className="max-w-screen-lg mx-auto">
          <div className="md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Нэр
            </label>
            <input
              type="text"
              className="px-3 py-2 text-blueGray-600 bg-white text-sm w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 placeholder-gray-400"
              placeholder="Нэр"
              value={formData.name}
              onChange={(event) => {
                setFormData({ ...formData, name: event.target.value });
                setcheckEmpty1(false);
              }}
              id={checkEmpty1 === true ? "border-red" : null}
            />
          </div>
          <div className="md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Тайлбар
            </label>
            <textarea
              className="px-3 py-2 text-blueGray-600 bg-white text-sm w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 placeholder-gray-400"
              rows="4"
              placeholder="Тайлбар"
              value={formData.description}
              onChange={(event) => {
                setFormData({ ...formData, description: event.target.value });
                setcheckEmpty2(false);
              }}
              id={checkEmpty2 === true ? "border-red" : null}
            ></textarea>
          </div>
          <div className="md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Сургалтууд
            </label>
            {trains === null ? (
              <p className="ml-2 mt-2">Сургалт олдсонгүй</p>
            ) : (
              <Select
                className="outline-none  w-full rounded bg-gray-50"
                options={trains}
                defaultValue={{
                  id: formData.trainingId,
                  name: cht?.name,
                }}
                onChange={(item) => {
                  setcheckEmpty3(false);
                  setFormData({ ...formData, trainingId: item.id });
                }}
                id={checkEmpty3 === true ? "border-red" : null}
                noOptionsMessage={({ inputValue }) =>
                  !inputValue && "Сонголт хоосон байна"
                }
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
              />
            )}
          </div>
          <div className="md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Эхлэх хугацаа
            </label>
            <DatePicker
              className="px-3 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              selected={date1}
              onChange={(date) => {
                setDate1(date);
                setFormData({
                  ...formData,
                  beginDate: moment(date).format(format),
                });
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              selectsStart
              startDate={date1}
              dateFormat="yyyy.MM.dd, HH:mm"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Дуусах хугацаа
            </label>
            <DatePicker
              className="px-3 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              selected={date2}
              onChange={(date) => {
                setDate2(date);
                setFormData({
                  ...formData,
                  endDate: moment(date).format(format),
                });
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              selectsStart
              startDate={date2}
              dateFormat="yyyy.MM.dd, HH:mm"
            />
          </div>
        </div>
      );
    } else if (step === 1) {
      return (
        <div className="space-y-4 grid grid-cols-1 gap-4  sm:grid-cols-1">
          <div className="border border-t-2 p-4 rounded-lg shadow-xs bg-gray-100 mb-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Асуулт
              </label>
              <input
                className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                onChange={(event) => {
                  setQuestionData(event.target.value);
                  setcheckEmpty11(false);
                }}
                id={checkEmpty11 === true ? "border-red" : null}
              />
            </div>

            <div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                {radioFields.map((form, index) => {
                  return (
                    <div key={index}>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Хариулт
                        </label>
                        <input
                          name="answer"
                          type="text"
                          className="px-3 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          onChange={(event) => handleRadioChange(event, index)}
                          value={form.answer}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Оноо
                        </label>
                        <input
                          name="points"
                          type="number"
                          className="px-3 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          onChange={(event) => handleRadioChange(event, index)}
                          value={form.points}
                        />
                      </div>
                      <div>
                        <button
                          onClick={() => removeRadioFields(index)}
                          className="mt-2 px-3 py-2 text-xs bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                          <i className="bi bi-trash-fill" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-right text-xs">
                <div className="inline-flex items-end">
                  <button
                    onClick={addRadioFields}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Хариулт нэмэх
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mx-auto mt-8 mb-0 max-w-md space-y-4">
          <input
            type="text"
            placeholder="Github"
            value={formData.github}
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            onChange={(e) => {
              setFormData({ ...formData, github: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="LinkedIn"
            value={formData.linkedin}
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            onChange={(e) => {
              setFormData({ ...formData, linkedin: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Twitter"
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            value={formData.twitter}
            onChange={(e) => {
              setFormData({ ...formData, twitter: e.target.value });
            }}
          />
        </div>
      );
    }
  };

  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <Navigation />
      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-sm md:text-xl lg:text-xl font-bold leading-normal text-gray-800">
              Үнэлгээ үүсгэх
            </p>
          </div>
        </div>

        <div className="p-2 mx-auto text-center">
          <div className="overflow-hidden">
            <div className="text-xl font-medium text-gray-800 dark:text-white">
              {FormTitles[step]}
            </div>
          </div>

          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mb-6">
            <div className="mt-2 mb-0 space-y-4 rounded-lg p-8 shadow-2xl border-t-4 border-indigo-500 rounded shadow">
              <div className="relative mt-1">{StepDisplay()}</div>
              <div className="text-center text-sm text-gray-500">
                <button
                  disabled={step === 0}
                  className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={() => {
                    setStep((currStep) => currStep - 1);
                  }}
                >
                  Prev
                </button>{" "}
                <button
                  className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={() => {
                    if (step === FormTitles.length - 1) {
                      console.log(formData);
                    } else {
                      setStep((currStep) => currStep + 1);
                      console.log(formData);
                    }
                  }}
                >
                  {step === FormTitles.length - 1 ? "Confirm" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default CreateRate;
