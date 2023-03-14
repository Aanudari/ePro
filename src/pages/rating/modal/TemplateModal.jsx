import { useStateContext } from "../../../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { logout } from "../../../service/examService";
import RatingCategoryAdd from "./RatingCategoryAdd";
import bg from "../../../assets/background-blue.jpg";
import TemplateCategoryCell from "../TemplateRelated/TemplateCategoryCell";
function TemplateModal({ setShow, id, categoryName }) {
  const { activeMenu, TOKEN } = useStateContext();
  const [data, setData] = useState();
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingTemplateNew/getTemplateInfo/${id}`,
    })
      .then((res) => {
        if (res.data.errorCode == 401) {
          logout();
        } else {
          setData(res.data.categories);
        }
      })
      .catch((err) => console.log(err));
  }, [trigger]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className={`fixed ${
        activeMenu
          ? " left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)]"
          : "w-full h-full top-[56px] left-0"
      } 
        bg-black top-[56px] bg-opacity-50 flex justify-center items-center z-20
        `}
    >
      {showModal && (
        <RatingCategoryAdd
          id={id}
          setShowModal={setShowModal}
          showModal={showModal}
          setTrigger={setTrigger}
          trigger={trigger}
        />
      )}
      <div
        style={{
          background: `url(${bg})`,
        }}
        className="shrink w-[calc(100%)] h-[calc(100%)] bg-white flex flex-col items-center"
      >
        <div className="w-full min-h-[50px] bg-teal-600 flex justify-between items-center px-3  gap-2 relative">
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="custom-btn min-w-[80px] md:min-w-[120px] lg:min-w-[180px] bg-teal-500 hover:bg-teal-400 active:bg-teal-600 h-10 text-[14px] flex items-center justify-center"
          >
            <i className="bi bi-plus-circle-dotted text-lg mr-2"></i>
            Категори
          </button>
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
        <div className="h-screen w-[300px] md:w-[600px] lg:w-[900px] bg-white p-3">
          {data?.length > 0 ? (
            data.map((item, index) => {
              return (
                <TemplateCategoryCell
                  key={JSON.stringify(item + index)}
                  item={item}
                  index={index}
                />
              );
            })
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <img src="/notfound.webp" alt="" className="h-[calc(50%)]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TemplateModal;
