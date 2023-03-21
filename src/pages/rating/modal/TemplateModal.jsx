import { useStateContext } from "../../../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { logout } from "../../../service/examService";
import RatingCategoryAdd from "./RatingCategoryAdd";
import bg from "../../../assets/bg3.jpg";
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
          setDataBuffer(res.data.categories);
          newDataBuffer = [...dataBuffer];
        }
      })
      .catch((err) => console.log(err));
  }, [trigger]);


  const [showModal, setShowModal] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [dataBuffer, setDataBuffer] = useState([]);

  let newDataBuffer = [];
  if (typeof dataBuffer[Symbol.iterator] === "function") {
    newDataBuffer = [...dataBuffer];
  } else {
    console.error("Error: dataBuffer is not iterable.");
    newDataBuffer = []; // Handle the error by setting newDataBuffer to an empty array, or another default value.
  }

  let dataApi = []; // used in hadgalah api call 

  return (
    <>
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
          className="shrink w-[calc(100%)] h-[calc(100%)] bg-white flex flex-col items-center justify-center"
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

          <div className="w-full h-[calc(100vh-100px)]  overflow-scroll flex justify-center">
            <div className="  w-[300px] md:w-[600px]  lg:w-[900px] p-3">
              {/*  test by mb  */}
              {isChanged && (
                <button
                  className="custom-btn min-w-[80px] md:min-w-[120px] lg:min-w-[180px] bg-teal-500 hover:bg-teal-400 active:bg-teal-600 h-10 text-[14px] flex items-center justify-center"
                  onClick={() => {
                    setIsChanged(false);
                    try {
                      newDataBuffer.map((inside) => {
                        console.log(
                          "The inside is  " +
                            JSON.stringify(inside.subCategories)
                        );
                        const newSubcategories = inside.subCategories.map(
                          ({ subcategoryId, ...subcategory }) => subcategory
                        );
                        console.log(JSON.stringify(newSubcategories));
                        dataApi = {
                          isEdit: Boolean(true),
                          templateId: `${id}`,
                          categoryId: `${inside.categoryId}`,
                          categoryName: `${inside.categoryName}`,
                          subCategories: newSubcategories,
                        };
                        axios({
                          method: "post",
                          headers: {
                            Authorization: `${TOKEN}`,
                            "Content-Type": "application/json",
                            accept: "text/json",
                          },
                          url: `${process.env.REACT_APP_URL}/v1/RatingTemplateNew/category`,
                          data: JSON.stringify(dataApi),
                        })
                          .then((res) => {
                            console.log(res);
                            setTrigger(!trigger);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      });
                    } catch (e) {
                      console.error(e.message);
                    }
                  }}
                >
                  Хадгалах
                </button>
              )}
              {/*  test by mb  */}

              {data?.length > 0 ? (
                data.map((item, index) => {
                  return (
                    <TemplateCategoryCell
                      key={JSON.stringify(item + index)}
                      /* test by mb */
                      setDataBuffer={setDataBuffer}
                      dataBuffer={dataBuffer}
                      /* END test by mb */

                      item={item}
                      index={index}
                      trigger={trigger}
                      setTrigger={setTrigger}
                      setIsChanged={setIsChanged}
                      newDataBuffer={newDataBuffer}
                    />
                  );
                })
              ) : (
                <div className="w-full bg-white h-full flex items-center justify-center">
                  <img src="/notfound.webp" alt="" className="h-[calc(40%)]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TemplateModal;
