import { useStateContext } from "../../../contexts/ContextProvider";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { logout } from "../../../service/examService";
import RatingCategoryAdd from "./RatingCategoryAdd";
import bg from "../../../assets/bg3.jpg";
import TemplateCategoryCell from "../TemplateRelated/TemplateCategoryCell";
import RatingAddExtra from "./RatingAddExtra";
import ExtraInput from "./ExtraInput";
import Loading from "../../../components/Loading";
function TemplateModal({ setShow, id, categoryName }) {
  const { activeMenu, TOKEN } = useStateContext();
  const [data, setData] = useState();
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingTemplateNew/getTemplateInfo/${id}`,
    })
      .then((res) => {
        if (res.data.errorCode === 401) {
          logout();
        } else {
          setData(res.data);
          setCategory(res.data.categories);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, [trigger, reload]);
  const [showModal, setShowModal] = useState(false);
  const [isExtra, setIsExtra] = useState(false);
  return (
    <>
      <div
        className={`fixed ${
          activeMenu ? " left-[250px] w-[calc(100%-250px)] " : "w-full left-0"
        } 
        bg-black h-[calc(100%-56px)] top-[56px] bg-opacity-50 flex justify-center items-center z-20
        `}
      >
        {loading && <Loading />}
        {showModal && (
          <RatingCategoryAdd
            id={id}
            setShowModal={setShowModal}
            showModal={showModal}
            setTrigger={setTrigger}
            trigger={trigger}
          />
        )}
        {isExtra && (
          <RatingAddExtra
            id={id}
            setIsExtra={setIsExtra}
            setTrigger={setTrigger}
            trigger={trigger}
          />
        )}
        <div
          style={{
            background: `url(${bg})`,
          }}
          className="shrink w-[calc(100%)] h-[calc(100%)] bg-white flex flex-col items-center justify-center"
        >
          <div className="w-full min-h-[50px] bg-teal-600 flex justify-between items-center px-3  gap-2 relative">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowModal(true);
                }}
                className="custom-btn min-w-[80px] md:min-w-[120px] lg:min-w-[180px] bg-teal-500 hover:bg-teal-400 active:bg-teal-600 h-10 text-[14px] flex items-center justify-center"
              >
                <i className="bi bi-plus-circle-dotted text-lg mr-2"></i>
                Ур чадварын жагсаалт
              </button>
              <button
                onClick={() => {
                  setIsExtra(true);
                }}
                className="custom-btn min-w-[80px] md:min-w-[120px] lg:min-w-[180px] bg-amber-500 hover:bg-amber-400 active:bg-amber-600 h-10 text-[14px] flex items-center justify-center"
              >
                <i className="bi bi-plus-circle-dotted text-lg mr-2"></i>
                Нэмэлт мэдээлэл
              </button>
            </div>

            <div
              onClick={() => {
                setShowModal(true);
              }}
              className="h-full flex items-center"
            >
              <i className="bi bi-card-checklist mr-2 text-xl text-white"></i>
              <span className="text-white font-[500] uppercase  text-[14px]">
                {categoryName}
              </span>
            </div>
            <button
              onClick={() => {
                setShow(false);
              }}
              className="w-[20px] h-full "
            >
              <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
            </button>
          </div>

          <div className="w-full h-[calc(100vh-100px)]  overflow-scroll flex justify-center">
            <div className="w-[300px] md:w-[600px]  lg:w-[900px] p-3">
              <div className="flex w-full flex-wrap items-center ">
                {data?.inputs.map((item, index) => {
                  return (
                    <ExtraInput
                      key={JSON.stringify(item) + index}
                      item={item}
                      index={index}
                      setTrigger={setTrigger}
                      trigger={trigger}
                      id={id}
                    />
                  );
                })}
              </div>
              <div className="">
                {category?.length > 0 ? (
                  category?.map((item, index) => {
                    return (
                      <TemplateCategoryCell
                        key={index}
                        item={item}
                        index={index}
                        trigger={trigger}
                        setTrigger={setTrigger}
                        templateId={id}
                        setReload={setReload}
                        reload={reload}
                      />
                    );
                  })
                ) : (
                  <div className="w-full bg-white h-full flex items-center justify-center">
                    <img
                      src="/notfound.webp"
                      alt=""
                      className="h-[calc(40%)]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TemplateModal;
