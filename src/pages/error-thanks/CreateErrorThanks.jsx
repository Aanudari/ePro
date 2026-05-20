import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
import axios from "axios";
import Select from "react-select";
import moment from "moment";

const API_URL = process.env.REACT_APP_URL;
const DATE_FORMAT = "YYYYMMDDHHmmss";
const UNAUTHORIZED_MESSAGES = [
  "Unauthorized",
  "Input string was not in a correct format.",
];

const countOptions = [
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "4" },
  { value: "5" },
];

const selectStyles = (hasError = false) => ({
  control: (base, state) => ({
    ...base,
    minHeight: "46px",
    borderRadius: "14px",
    borderColor: hasError ? "#ef4444" : state.isFocused ? "#818cf8" : "#e5e7eb",
    boxShadow: state.isFocused
      ? hasError
        ? "0 0 0 4px rgba(239, 68, 68, 0.12)"
        : "0 0 0 4px rgba(99, 102, 241, 0.12)"
      : "none",
    backgroundColor: "#f8fafc",
    "&:hover": {
      borderColor: hasError ? "#ef4444" : "#818cf8",
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.14)",
    zIndex: 30,
  }),
  option: (base, state) => ({
    ...base,
    fontSize: "13px",
    fontWeight: 600,
    color: state.isSelected ? "#ffffff" : "#374151",
    backgroundColor: state.isSelected
      ? "#4f46e5"
      : state.isFocused
        ? "#eef2ff"
        : "#ffffff",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9ca3af",
    fontSize: "13px",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#111827",
    fontSize: "13px",
    fontWeight: 600,
  }),
});

const PageButton = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
  >
    {children}
  </button>
);

const RequiredMark = () => <span className="text-red-500">*</span>;

const ErrorText = ({ show }) =>
  show ? (
    <p className="mt-1 mb-0 text-xs font-semibold text-red-500">
      Заавал бөглөнө үү.
    </p>
  ) : null;

const FieldLabel = ({ children, required = true }) => (
  <label className="block mb-2 text-sm font-medium text-gray-700">
    {children} {required ? <RequiredMark /> : null}
  </label>
);

const FormSection = ({ title, description, children }) => (
  <div className="p-5 bg-white shadow-sm rounded-3xl ring-1 ring-gray-100">
    <div className="mb-5">
      <p className="mb-1 text-base font-bold text-gray-950">{title}</p>
      <p className="mb-0 text-xs font-medium text-gray-500">{description}</p>
    </div>
    {children}
  </div>
);

const TextInput = ({ hasError, className = "", ...props }) => (
  <input
    {...props}
    className={`h-[46px] w-full rounded-2xl border bg-slate-50 px-4 py-2 text-sm font-semibold text-gray-800 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
        : "border-gray-200 focus:border-indigo-300 focus:ring-indigo-50"
    } ${className}`}
  />
);

const TextArea = ({ hasError, className = "", ...props }) => (
  <textarea
    {...props}
    className={`w-full resize-none rounded-2xl border bg-slate-50 px-4 py-3 text-sm font-medium text-gray-800 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
        : "border-gray-200 focus:border-indigo-300 focus:ring-indigo-50"
    } ${className}`}
  />
);

function CreateErrorThanks() {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();

  const type = location.state.type.category;
  const typeid = location.state.type.id;

  const [startDate, setStartDate] = useState(new Date());
  const dateTime1 = moment(startDate).format(DATE_FORMAT);

  const [selectedOption, setSelectedOption] = useState(null);

  const [checkEmpty1, setCheckEmpty1] = useState(false);
  const [checkEmpty2, setCheckEmpty2] = useState(false);
  const [checkEmpty3, setCheckEmpty3] = useState(false);
  const [checkEmpty4, setCheckEmpty4] = useState(false);
  const [checkEmpty5, setCheckEmpty5] = useState(false);
  const [checkEmpty6, setCheckEmpty6] = useState(false);
  const [checkEmpty7, setCheckEmpty7] = useState(false);
  const [checkEmpty8, setCheckEmpty8] = useState(false);
  const [checkEmpty9, setCheckEmpty9] = useState(false);

  const [alba, setAlba] = useState([]);
  const [heltes, setHeltes] = useState([]);
  const [negj, setNegj] = useState([]);
  const [ajiltan, setAjiltan] = useState([]);

  const [selectedAlba, setSelectedAlba] = useState(null);
  const [selectedHeltes, setSelectedHeltes] = useState(null);
  const [selectedNegj, setSelectedNegj] = useState(null);
  const [selectedAjiltan, setSelectedAjiltan] = useState(null);

  const [tooVAl, setTooVal] = useState("");
  const [complainType, setComplainType] = useState("");
  const [rule, setRule] = useState("");
  const [desc, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSolved, setIsSolved] = useState("");
  const [solvedDescription, setsolvedDescription] = useState("");

  const isThanksType = typeid === "3";

  const handleUnauthorized = (message) => {
    if (UNAUTHORIZED_MESSAGES.includes(message)) logout();
  };

  const fetchListData = (url, setter) => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          setter(res.data.listData);
        }

        handleUnauthorized(res.data.resultMessage);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchListData(`${API_URL}/v1/ComplainReport/getListData/1`, setAlba);
  }, []);

  useEffect(() => {
    if (selectedAlba) {
      fetchListData(
        `${API_URL}/v1/ComplainReport/getListData/2?depId=${selectedAlba.id}`,
        setHeltes,
      );
    }
  }, [selectedAlba]);

  useEffect(() => {
    if (selectedHeltes) {
      fetchListData(
        `${API_URL}/v1/ComplainReport/getListData/3?depId=${selectedAlba.id}&divId=${selectedHeltes.id}`,
        setNegj,
      );
    }
  }, [selectedHeltes]);

  useEffect(() => {
    if (selectedNegj) {
      fetchListData(
        `${API_URL}/v1/ComplainReport/getListData/4?depId=${selectedAlba.id}&divId=${selectedHeltes.id}&unitId=${selectedNegj.id}`,
        setAjiltan,
      );
    }
  }, [selectedNegj]);

  const handleAlba = (item) => {
    setSelectedAlba(item);
    setSelectedHeltes(null);
    setSelectedNegj(null);
    setSelectedAjiltan(null);
    setHeltes([]);
    setNegj([]);
    setAjiltan([]);
    setCheckEmpty1(false);
  };

  const handleHeltes = (item) => {
    setSelectedHeltes(item);
    setSelectedNegj(null);
    setSelectedAjiltan(null);
    setNegj([]);
    setAjiltan([]);
    setCheckEmpty2(false);
  };

  const handleNegj = (item) => {
    setSelectedNegj(item);
    setSelectedAjiltan(null);
    setAjiltan([]);
    setCheckEmpty3(false);
  };

  const handleAjiltan = (item) => {
    setSelectedAjiltan(item);
    setCheckEmpty4(false);
  };

  const handleToo = (item) => {
    setSelectedOption(item);
    setTooVal(item.value);
  };

  const handleNumChange = (event) => {
    const limit = 8;
    const inputNum = event.target.value.slice(0, limit);

    if (inputNum.length <= limit) {
      setPhoneNumber(inputNum);
    }
  };

  const data = {
    department: `${selectedAlba?.id}`,
    divsionId: `${selectedHeltes?.id}`,
    unit: `${selectedNegj?.id}`,
    deviceId: `${selectedAjiltan?.id}`,
    complain: `${typeid}`,
    complainType: `${complainType}`,
    description: `${desc}`,
    rule: `${rule}`,
    too: `${tooVAl}`,
    createdDate: `${dateTime1}`,
    phoneNo: `${phoneNumber}`,
    isSolved: `${isSolved}`,
    solvedDescription: `${solvedDescription}`,
  };

  const submitForm = () => {
    axios({
      method: "post",
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json",
        accept: "text/plain",
      },
      url: `${API_URL}/v1/Complain/add`,
      data,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          const timer = setTimeout(() => navigate("/error-thanks"), 1000);
          return () => clearTimeout(timer);
        }

        if (res.data.resultMessage === "Unauthorized") {
          logout();
          return;
        }

        console.log(res.data.resultMessage);
      })
      .catch((err) => console.log(err));
  };

  const validateCommonFields = () => {
    if (selectedAlba === null) {
      setCheckEmpty1(true);
      return false;
    }
    if (selectedHeltes === null) {
      setCheckEmpty2(true);
      return false;
    }
    if (selectedNegj === null) {
      setCheckEmpty3(true);
      return false;
    }
    if (selectedAjiltan === null) {
      setCheckEmpty4(true);
      return false;
    }
    if (complainType.length === 0) {
      setCheckEmpty5(true);
      return false;
    }
    if (desc.length === 0) {
      setCheckEmpty9(true);
      return false;
    }
    if (tooVAl.length === 0) {
      setCheckEmpty8(true);
      return false;
    }

    return true;
  };

  const navigateIndex = (e) => {
    e.preventDefault();

    if (!validateCommonFields()) return;

    if (rule.length === 0) {
      setCheckEmpty7(true);
      return;
    }

    submitForm();
  };

  const navigateIndex1 = (e) => {
    e.preventDefault();

    if (!validateCommonFields()) return;

    if (phoneNumber.length === 0) {
      setCheckEmpty6(true);
      return;
    }

    submitForm();
  };

  return (
    <div className="min-h-[calc(100%-56px)] w-full overflow-x-hidden bg-slate-50 md:w-[calc(100vw-250px)]">
      <Navigation />

      <div className="max-w-full px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-3 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 p-[1px] shadow-lg shadow-indigo-100">
          <div className="p-5 rounded-3xl bg-white/95 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <button
                  onClick={() => navigate("/error-thanks")}
                  type="button"
                  className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <i className="bi bi-arrow-left" />
                  Буцах
                </button>

                <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 text-xs font-medium text-indigo-700 rounded-full bg-indigo-50 ring-1 ring-indigo-100">
                  <i className="bi bi-pencil-square" />
                  Шинэ бүртгэл
                </div>

                <h1 className="mb-1 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                  {type} бүртгэх
                </h1>
                <p className="mb-0 text-sm font-medium text-gray-500">
                  Алба, хэлтэс, ажилтан болон дэлгэрэнгүй мэдээллийг бөглөөд
                  хадгална уу.
                </p>
              </div>

              <div className="px-4 py-3 rounded-2xl bg-indigo-50 ring-1 ring-indigo-100">
                <p className="mb-1 text-xs font-semibold text-indigo-400 uppercase">
                  Төрөл
                </p>
                <p className="mb-0 text-xl font-bold text-indigo-700">{type}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
          <FormSection
            title="Байгууллагын мэдээлэл"
            description="Алба, хэлтэс, ажлын байр болон ажилтныг сонгоно."
          >
            <div className="space-y-4">
              <div>
                <FieldLabel>Алба</FieldLabel>
                <Select
                  className="text-sm"
                  styles={selectStyles(checkEmpty1)}
                  options={alba}
                  value={selectedAlba}
                  onChange={handleAlba}
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue && "Сонголт хоосон байна"
                  }
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                />
                <ErrorText show={checkEmpty1} />
              </div>

              <div>
                <FieldLabel>Хэлтэс</FieldLabel>
                <Select
                  className="text-sm"
                  styles={selectStyles(checkEmpty2)}
                  options={heltes}
                  value={selectedHeltes}
                  onChange={handleHeltes}
                  isDisabled={!selectedAlba}
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue && "Сонголт хоосон байна"
                  }
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                />
                <ErrorText show={checkEmpty2} />
              </div>

              <div>
                <FieldLabel>Ажлын байр</FieldLabel>
                <Select
                  className="text-sm"
                  styles={selectStyles(checkEmpty3)}
                  options={negj}
                  value={selectedNegj}
                  onChange={handleNegj}
                  isDisabled={!selectedHeltes}
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue && "Сонголт хоосон байна"
                  }
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                />
                <ErrorText show={checkEmpty3} />
              </div>

              <div>
                <FieldLabel>Ажилтны нэр</FieldLabel>
                <Select
                  className="text-sm"
                  styles={selectStyles(checkEmpty4)}
                  options={ajiltan}
                  value={selectedAjiltan}
                  onChange={handleAjiltan}
                  isDisabled={!selectedNegj}
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue && "Сонголт хоосон байна"
                  }
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                />
                <ErrorText show={checkEmpty4} />
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Үндсэн мэдээлэл"
            description="Огноо, төрөл болон холбогдох мэдээллийг оруулна."
          >
            <div className="space-y-4">
              <div>
                <FieldLabel required={false}>Огноо</FieldLabel>
                <DatePicker
                  className="h-[46px] w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-gray-800 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  dateFormat="yyyy, MM сарын dd"
                />
              </div>

              {!isThanksType && (
                <div>
                  <FieldLabel>Холбогдох дугаар</FieldLabel>
                  <TextInput
                    type="number"
                    value={phoneNumber}
                    hasError={checkEmpty6}
                    placeholder="Утасны дугаар"
                    onChange={(e) => {
                      setCheckEmpty6(false);
                      handleNumChange(e);
                    }}
                  />
                  <ErrorText show={checkEmpty6} />
                </div>
              )}

              <div>
                <FieldLabel>
                  {isThanksType ? "Төрөл" : "Гомдлын төрөл"}
                </FieldLabel>
                <TextArea
                  rows="5"
                  value={complainType}
                  hasError={checkEmpty5}
                  placeholder={
                    isThanksType ? "Талархлын төрөл..." : "Гомдлын төрөл..."
                  }
                  onChange={(e) => {
                    setComplainType(e.target.value);
                    setCheckEmpty5(false);
                  }}
                />
                <ErrorText show={checkEmpty5} />
              </div>
            </div>
          </FormSection>
          <FormSection
            title="Нэмэлт мэдээлэл"
            description="Тоо, шийдвэрлэлт болон бүртгэлийн сувгийг бөглөнө."
          >
            <div className="space-y-4">
              <div>
                <FieldLabel>
                  {isThanksType ? "Тоогоор" : "Алдааны тоо"}
                </FieldLabel>
                <Select
                  placeholder={isThanksType ? "Талархалын тоо" : "Алдааны тоо"}
                  options={countOptions}
                  value={selectedOption}
                  onChange={(item) => {
                    handleToo(item);
                    setCheckEmpty8(false);
                  }}
                  styles={selectStyles(checkEmpty8)}
                  className="text-sm"
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue && "Сонголт хоосон байна"
                  }
                  getOptionLabel={(option) => option.value}
                  getOptionValue={(option) => option.value}
                />
                <ErrorText show={checkEmpty8} />
              </div>

              {isThanksType && (
                <div>
                  <FieldLabel>Бүртгэгдсэн суваг</FieldLabel>
                  <TextArea
                    rows="4"
                    value={rule}
                    hasError={checkEmpty7}
                    placeholder="Жишээ: Утас, имэйл, санал хүсэлт..."
                    onChange={(e) => {
                      setRule(e.target.value);
                      setCheckEmpty7(false);
                    }}
                  />
                  <ErrorText show={checkEmpty7} />
                </div>
              )}

              {!isThanksType && (
                <div>
                  <FieldLabel required={false}>Шийдвэрлэсэн эсэх</FieldLabel>
                  <TextArea
                    rows="4"
                    value={isSolved}
                    placeholder="Шийдвэрлэлтийн төлөв..."
                    onChange={(e) => setIsSolved(e.target.value)}
                  />
                </div>
              )}

              {typeid === "1" && (
                <div>
                  <FieldLabel required={false}>Шийдвэрлэсэн хариу</FieldLabel>
                  <TextArea
                    rows="4"
                    value={solvedDescription}
                    placeholder="Шийдвэрлэсэн хариу..."
                    onChange={(e) => setsolvedDescription(e.target.value)}
                  />
                </div>
              )}
            </div>
          </FormSection>
        </div>

        <div className="p-5 mt-3 bg-white shadow-sm rounded-3xl ring-1 ring-gray-100">
          {" "}
          <FieldLabel>
            {isThanksType ? "Дэлгэрэнгүй" : "Гомдлын дэлгэрэнгүй"}
          </FieldLabel>
          <TextArea
            rows="5"
            value={desc}
            hasError={checkEmpty9}
            placeholder={
              isThanksType
                ? "Дэлгэрэнгүй мэдээлэл..."
                : "Гомдлын дэлгэрэнгүй мэдээлэл..."
            }
            onChange={(e) => {
              setDescription(e.target.value);
              setCheckEmpty9(false);
            }}
          />
          <ErrorText show={checkEmpty9} />
          <div className="flex flex-col-reverse gap-3 pt-5 mt-2 border-t border-gray-100 sm:flex-row sm:justify-end">
            <PageButton
              onClick={() => navigate("/error-thanks")}
              type="button"
              className="text-gray-700 bg-white ring-1 ring-gray-200 hover:bg-gray-50 focus:ring-gray-100"
            >
              Болих
            </PageButton>

            <PageButton
              onClick={type === "Талархал" ? navigateIndex : navigateIndex1}
              type="submit"
              className="bg-emerald-600 text-white hover:-translate-y-0.5 hover:bg-emerald-700 focus:ring-emerald-100"
            >
              <i className="bi bi-check2-circle" />
              Submit
            </PageButton>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default CreateErrorThanks;
