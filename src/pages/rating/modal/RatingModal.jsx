import { useStateContext } from "../../../contexts/ContextProvider";
import { logout } from "../../../service/examService";
import { useState, useEffect } from "react";
import axios from "axios";
import bg from "../../../assets/bg.jpg";
import SelectCategoryCell from "../TemplateRelated/SelectCategoryCell";
import Loading from "../../../components/Loading";
import { toast, ToastContainer } from "react-toastify";
import RatingExtra from "./RatingExtra";
import Progress from "../../../components/Progress";
function RatingModal({
  setShowModal,
  ratingId,
  deviceId,
  trigger,
  setTrigger,
  recallList,
  setRecallList,
  user,
}) {
  const { activeMenu, TOKEN } = useStateContext();
  const [data, setData] = useState();
  const [categoryList, setCategoryList] = useState();
  const [recall, setRecall] = useState(false);
  const [ratingScore, setRatingScore] = useState(0);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/GetRatingDevice/${deviceId}/${ratingId}`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          setData(res.data);
          setCategoryList(res.data.categoryList);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [trigger, recall]);
  const [list, setList] = useState([]);
  let raw = [];

  for (let index = 0; index < categoryList?.length; index++) {
    const element = categoryList[index];
    let cat = [];
    let temp = {
      categoryId: element.categoryId,
      subCategories: cat,
    };
    for (let j = 0; j < element.subCategories.length; j++) {
      const el = element.subCategories[j];
      let tempo = {
        subCategoryId: el.subCategoryId,
        score: el.subCatUserScore == "" ? "" : el.subCatUserScore,
        comment: el.comment,
      };
      cat.push(tempo);
    }
    raw.push(temp);
  }
  const [children, setChildren] = useState([]);
  const extras = [];
  for (let index = 0; index < data?.inputs.length; index++) {
    const element = data?.inputs[index];
    extras.push({
      inputId: element.inputId,
      inputValue: element.inputValue,
    });
  }
  const [finalExtra, setFinalExtra] = useState([]);
  const handleExtras = (value, idOfObjects) => {
    let modified =
      finalExtra.length > 0
        ? finalExtra.map((item, indexP) => {
            return item.inputId == idOfObjects
              ? { ...item, inputValue: value }
              : item;
          })
        : extras.map((item, indexP) => {
            return item.inputId == idOfObjects
              ? { ...item, inputValue: value }
              : item;
          });
    setFinalExtra(modified);
  };
  const handleExtraDate = (value, idOfItem) => {
    let modified =
      finalExtra.length > 0
        ? finalExtra.map((item, indexP) => {
            return item.inputId == idOfItem
              ? { ...item, inputValue: value }
              : item;
          })
        : extras.map((item, indexP) => {
            return item.inputId == idOfItem ? { ...item, inputValue: 1 } : item;
          });
    setFinalExtra(modified);
  };
  const final = {
    ratingId: ratingId,
    deviceId: deviceId,
    categoryList: children,
    inputs: finalExtra.length > 0 ? finalExtra : extras,
  };
  const handleSubmit = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/doRating`,
      data: final,
    })
      .then((res) => {
        if (res.data.isSuccess == false) {
          toast.error(res.data.resultMessage, {
            position: "bottom-right",
          });
        } else {
          if (res.data.errorCode == 401) {
            logout();
          } else {
            setTrigger(!trigger);
            setRecall(!recall);
            setRecallList(!recallList);
            setShowModal(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSelect = (cat, sub, value, comment) => {
    let newChildren = children.length === 0 ? raw : children;
    let temp = newChildren.map((element, index) => {
      return element.categoryId === cat
        ? {
            ...element,
            subCategories: element.subCategories.map((el, i) => {
              return el.subCategoryId == sub
                ? { ...el, score: value, comment: comment }
                : el;
            }),
          }
        : element;
    });
    setChildren(temp);
  };
  // console.log(children);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  // console.log(data.conversationId);
  const handleSubmitFile = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    // console.log(TOKEN);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/addRatingFile?conversationId=${data.conversationId}&fileType=1`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${TOKEN}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data.isSuccess == false) {
          toast.error(res.data.resultMessage, {
            position: "bottom-right",
          });
        } else {
          setRecall(!recall);
          setRecallList(!recallList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmitFile2 = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    // console.log(TOKEN);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/addRatingFile?conversationId=${data.conversationId}&fileType=2`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${TOKEN}`,
      },
    })
      .then((res) => {
        setLoading(false);
        if (res.data.isSuccess == false) {
          toast.error(res.data.resultMessage, {
            position: "bottom-right",
          });
        } else {
          setRecall(!recall);
          setRecallList(!recallList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const [sum, setSum] = useState([]);
  const handleTotal = (value) => {
    setSum((prev) => [...prev, value]);
  };
  const [finalScore, setFinalScore] = useState(0);
  const [arr, setArr] = useState([]);
  const collectCatScore = (value, categoryId) => {
    const tempo = {
      categoryId: categoryId,
      point: value,
    };
    setArr((prev) => [...prev, tempo]);
    // arrS.push(tempo);
  };
  useEffect(() => {
    let copy = arr;
    const uniquePoints = Object.values(
      copy.reduce((result, item, index) => {
        if (!result[item.categoryId] || result[item.categoryId].index < index) {
          result[item.categoryId] = { point: item.point, index };
        }
        return result;
      }, {})
    );

    const sumPoints = uniquePoints.reduce((sum, item) => sum + item.point, 0);
    const avgPoints = sumPoints / uniquePoints.length;
    const rounded = Math.round(avgPoints);
    setFinalScore(rounded);
  }, [arr]);

  return (
    <div
      className={`fixed ${
        activeMenu ? " left-[250px] w-[calc(100%-250px)]" : "w-full left-0"
      } 
        bg-black bg-opacity-50 flex justify-center items-center z-20 h-full
        `}
    >
      <div
        style={{ background: `url(${bg})` }}
        className="shrink w-[calc(100%)] h-[calc(100%)] bg-white flex flex-col items-center "
      >
        <ToastContainer />
        {loading && <Loading />}
        <div className="w-full min-h-[56px] bg-teal-600 flex justify-between items-center px-3  gap-2 relative">
          <div className="flex h-[calc(80%)]">
            <div className="flex flex-col h-full items-start justify-center">
              <span className="font-[500] text-[13px] text-white m-0">
                <i className="font-[500] text-[13px] text-white m-0">
                  {user.deviceName}
                </i>
              </span>{" "}
              <span className="m-0">
                <i className="font-[500] text-[13px] text-white m-0">
                  Ажлын байр : {user.unitName}
                </i>
              </span>{" "}
            </div>
            <div className="flex flex-col h-full items-start justify-end ml-2 border-l pl-3">
              <span className="mb-[1px]">
                <i className="font-[500] text-[13px] text-white m-0">
                  Дундаж оноо : {finalScore}%
                </i>
              </span>{" "}
            </div>
          </div>
          <div className="flex h-full flex gap-5  py-[6px]">
            {children.length > 0 ? (
              <button
                onClick={() => {
                  handleSubmit();
                }}
                className=" custom-btn
             btn-20 active:mt-[2px]"
              >
                Хадгалах
              </button>
            ) : finalExtra.length > 0 ? (
              <button
                onClick={() => {
                  handleSubmit();
                }}
                className=" custom-btn
             btn-20 active:mt-[2px]"
              >
                Хадгалах
              </button>
            ) : null}

            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="w-[20px] h-full "
            >
              <i className="bi bi-x-lg text-white text-2xl font-[500] "></i>
            </button>
          </div>
        </div>
        <div className="w-full h-full flex items-center flex-col overflow-scroll justify-center">
          <div className="w-full h-[56px]">1</div>
          {data?.inputs?.length > 0 && (
            <div className="w-[900px] px-3 pt-5 !mt-[150px]">
              <div className="flex w-full flex-wrap items-center ">
                {data?.inputs.map((item, index) => {
                  return (
                    <RatingExtra
                      key={index}
                      item={item}
                      index={index}
                      setTrigger={setTrigger}
                      trigger={trigger}
                      handleExtras={handleExtras}
                      handleExtraDate={handleExtraDate}
                    />
                  );
                })}
              </div>
            </div>
          )}

          <div className="w-[900px] px-3 pt-5 h-full">
            {categoryList?.map((category, index) => {
              return (
                <SelectCategoryCell
                  key={JSON.stringify(category + index)}
                  category={category}
                  index={index}
                  handleSelect={handleSelect}
                  handleTotal={handleTotal}
                  children={children}
                  collectCatScore={collectCatScore}
                />
              );
            })}
            <div className="w-full ">
              <div className="flex items-center justify-between">
                <div className="file-uploader h-[200px]">
                  <form onSubmit={handleSubmitFile}>
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      className="mr-2  bg-teal-500 text-white font-[400] !border-none cursor-pointer hover:!bg-teal-400"
                    />
                    {selectedFile != null && (
                      <input
                        className="custom-btn btn-13 !bg-teal-500"
                        type="submit"
                        value="Upload"
                      />
                    )}
                  </form>
                  <div className="w-full mb-2 text-white flex justify-start items-center">
                    <span className="mb-0 mt-2 font-[500]">file 1 :</span>
                    {data?.filePath != "" && (
                      <a
                        href={`${data?.filePath}`}
                        target="_blank"
                        className={`font-[500] text-[19px] text-white hover:text-black cursor-pointer select-none  mt-2 transition-all p-2`}
                      >
                        <i className="bi bi-file-earmark-spreadsheet-fill "></i>
                        {data?.filePath.slice(45, 100)}
                      </a>
                    )}
                  </div>
                </div>
                <div className="file-uploader h-[200px]">
                  <form onSubmit={handleSubmitFile2}>
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      className="mr-2 bg-teal-500 text-white font-[400] !border-none cursor-pointer hover:!bg-teal-400"
                    />
                    {selectedFile != null && (
                      <input
                        className="custom-btn btn-13 !bg-teal-500"
                        type="submit"
                        value="Upload"
                      />
                    )}
                  </form>
                  <div className="w-full mb-2 text-white flex justify-start items-center ">
                    <span className="mb-0 mt-2 font-[500]">file 2 :</span>
                    {data?.filePath2 != "" && (
                      <>
                        {/* <img src={`${data?.filePath2}`} alt="" /> */}
                        <a
                          href={`${data?.filePath2}`}
                          target="_blank"
                          className={`font-[500] text-[19px] text-white hover:text-black cursor-pointer select-none  mt-2 transition-all p-2`}
                        >
                          <i className="bi bi-file-earmark-spreadsheet-fill "></i>
                          {data?.filePath2.slice(45, 100)}
                        </a>
                      </>
                    )}
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

export default RatingModal;
