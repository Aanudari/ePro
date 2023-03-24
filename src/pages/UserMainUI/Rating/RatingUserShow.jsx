import UserLayout from "../../../components/UserLayout";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { logout } from "../../../service/examService";
import UserRatingCategory from "./Cells/UserRatingCategory";
import useWindowDimensions from "../../../components/SizeDetector";
import Modal from "react-bootstrap/Modal";
import ModalSuccess from "./modal/ModalSuccess";
import { toast, ToastContainer } from "react-toastify";

function RatingUserShow() {
  const scrollableRef = useRef(null);
  const location = useLocation();
  const deviceId = location?.state?.deviceId;
  const ratingId = location?.state?.ratingId;
  const ratedBy = location?.state?.ratedBy;
  const conversationId = location?.state?.conversationId;
  const { TOKEN } = useStateContext();
  const { width } = useWindowDimensions();
  const [categories, setCategories] = useState();
  const [trigger, setTrigger] = useState(false);
  const [show, setShow] = useState(false);
  const [main, setMain] = useState();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/GetRatingDevice/${deviceId}/${ratingId}`,
    })
      .then((res) => {
        setMain(res.data);
        if (res.data.isSuccess == true) {
          // console.log(res.data);
          setCategories(res.data.categoryList);
          //   console.log(res.data);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  //   console.log(categories);
  const [chatWindow, setchatWindow] = useState(false);
  const [comments, setComments] = useState();
  const [modalImg, setModalImg] = useState();
  //   console.log(categories);
  useEffect(() => {
    setTimeout(() => {
      axios({
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${TOKEN}`,
        },
        url: `${process.env.REACT_APP_URL}/v1/RatingNew/GetComments/${conversationId}`,
      })
        .then((res) => {
          setTrigger(!trigger);
          if (res.data.errorCode == 401) {
            logout();
          } else {
            setComments(res.data.commentList);
          }
          // console.log(res.data);
        })
        .catch((err) => console.log(err));
    }, 5000);
  }, [trigger]);
  useEffect(() => {
    const scrollable = scrollableRef.current;
    if (scrollable !== null) {
      scrollable.scrollTop = scrollable.scrollHeight;
    }
  });
  const [success, setSuccess] = useState(false);
  const [value, setValue] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [success]);
  const submitComment = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: TOKEN,
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/doComment?conversationId=${conversationId}&comment=${value}`,
      // data: images,
    })
      .then((res) => {
        // console.log(images[0]);
        // console.log(res.data);
        setTrigger(!trigger);
        setValue("");
        // setImages([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAgreement = () => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/confirmRating/${conversationId}`,
      // data: images,
    })
      .then((res) => {
        // console.log(res.data);
        if (res.data.isSuccess == true) {
          setSuccess(true);
        } else {
          toast.info(JSON.stringify(res.data.resultMessage), {
            position: "bottom-right",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <UserLayout>
      <ToastContainer />
      <main className="main min-h-[calc(100vh-60px)]">
        <div className="responsive-wrapper relative">
          <div className="bg-[#ecf0f3] rounded-[20px] p-4 mt-4 shadow-md">
            <div className="flex justify-between">
              <div className="mt-2 w-full flex">
                <h6>Статус: </h6>
                {main?.userStatus === "N" ? (
                  <div className="w-full">
                    <span className="mb-0 ml-1 md:ml-2 font-[400] px-3 py-2 bg-white rounded">
                      Батлаагүй
                    </span>
                    <span className="ml-2">
                      Та дэлгэцийн доор байрлах "Үнэлгээ зөвшөөрөх" товчийг дарж
                      үнэлгээгээ баталгаажуулна уу.
                    </span>
                  </div>
                ) : (
                  <span className="mb-0 ml-1 md:ml-2 font-[400] px-3 py-2 bg-white rounded">
                    Баталгаажсан
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="pb-10">
            {categories?.map((category, index) => {
              return <UserRatingCategory category={category} key={index} />;
            })}
          </div>
          {main?.userStatus !== "N" && (
            <div
              onClick={() => {
                handleAgreement();
              }}
              className="font-[500] text-center flex items-center justify-center text-white h-10 md:h-14 bg-emerald-500 cursor-pointer hover:bg-emerald-400 p-2 rounded mb-10"
            >
              Үнэлгээ зөвшөөрөх
            </div>
          )}
          {!chatWindow && (
            <div
              onClick={() => {
                setchatWindow(true);
                setTrigger(!trigger);
              }}
              className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] shadow bg-blue-700 hover:scale-105 transition-all cursor-pointer rounded-full fixed 
            bottom-4 right-4 md:bottom-10 md:right-10
          flex items-center justify-center"
            >
              <i className="bi bi-chat-dots-fill text-[25px] md:text-[40px] text-white"></i>
              <div className="absolute shadow  bottom-0 right-0 border-white border-[2px] bg-green-600 rounded-full w-4 h-4 md:w-5 md:h-5"></div>
            </div>
          )}
          {success && <ModalSuccess />}

          {chatWindow && (
            <div className="w-full md:w-[300px] fixed bottom-0 right-0 md:right-10 shadow h-[360px] rounded-t bg-white">
              <div className="h-14 bg-blue-700 rounded-t shadow w-full flex justify-between items-center px-3">
                <div className="font-[500] text-white">{ratedBy}</div>

                <div>
                  <i
                    onClick={() => {
                      setchatWindow(false);
                    }}
                    className="bi bi-x-lg text-lg text-white cursor-pointer"
                  ></i>
                </div>
              </div>
              <div
                className="h-[248px] !break-words w-full md:w-[300px] shadow-inner px-2 pt-1 overflow-scroll scrollable"
                ref={scrollableRef}
              >
                {comments?.map((comment, index) => {
                  // console.log(comment);
                  return (
                    <div
                      key={index}
                      className={`bubble max-w-[260px] ${
                        comment.isYou === "1" ? "me" : "you-blue"
                      }`}
                    >
                      {comment.comment}
                      {comment.commentImg != "" && (
                        <div
                          onClick={() => {
                            setShow(true);
                            setModalImg(comment.commentImg);
                          }}
                          className="mt-2 rounded bg-white"
                        >
                          <img
                            className="w-[200px] rounded border cursor-pointer hover:shadow"
                            src={`http://${comment.commentImg}`}
                            alt=""
                          />
                        </div>
                      )}
                      <ImageModal
                        img={modalImg}
                        show={show}
                        onHide={() => setShow(false)}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="h-14 w-full border-t flex items-center px-3 justify-between ">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitComment();
                  }}
                  className="flex w-full justify-between gap-2"
                  action=""
                >
                  <input
                    type="text"
                    className=" w-full py-1 rounded h-10 bg-gray-100"
                    autoFocus
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />

                  <button
                    type="submit"
                    className="rounded px-2 bg-blue-700 font-[400] text-white"
                  >
                    Илгээх
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </UserLayout>
  );
}

export default RatingUserShow;

function ImageModal(props) {
  const { activeMenu } = useStateContext();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // style={{minHeight: "400px"}}
    >
      {/* <Modal.Body style={{ background: "none" }}> */}
      <img src={`http://${props.img}`} alt="" />
      {/* </Modal.Body> */}
    </Modal>
  );
}
