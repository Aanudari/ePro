import { useStateContext } from "../../../contexts/ContextProvider";
import { useState, useEffect, useRef } from "react";
import { logout } from "../../../service/examService";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import ImageUploading from "react-images-uploading";
function CommentModal({
  modalShow,
  setModalShow,
  conversationId,
  recallChild,
  setRecallChild,
}) {
  const { activeMenu, TOKEN } = useStateContext();
  const [comments, setComments] = useState();
  const [trigger, setTrigger] = useState(false);
  const [show, setShow] = useState(false);
  // console.log(modalShow);
  // console.log(conversationId);

  const scrollableRef = useRef(null);

  useEffect(() => {
    const scrollable = scrollableRef.current;
    if (scrollable !== null) {
      scrollable.scrollTop = scrollable.scrollHeight;
    }
  });
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/GetComments/${conversationId}`,
    })
      .then((res) => {
        if (res.data.errorCode == 401) {
          logout();
        } else {
          setComments(res.data.commentList);
          setRecallChild(!recallChild);
        }
      })
      .catch((err) => console.log(err));
  }, [trigger]);
  const [value, setValue] = useState("");
  // console.log(comments);
  const submitComment = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: TOKEN,
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/doComment?conversationId=${conversationId}&comment=${value}`,
      data: images,
    })
      .then((res) => {
        console.log(images[0]);
        // console.log(res.data);
        setTrigger(!trigger);
        setValue("");
        setImages([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(comments);
  const [images, setImages] = useState([]);
  const [modalImg, setModalImg] = useState();
  const maxNumber = 69;
  // console.log(images);
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
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
      <div
        onClick={() => {
          setModalShow(false);
        }}
        className="w-full h-full relative "
      ></div>
      <div className="w-[calc(60%)] h-[calc(60%)] shrink bg-white flex flex-col items-center rounded-[22px] absolute ">
        <div
          onBlur={() => {
            setModalShow(false);
          }}
          className="w-full min-h-[50px] bg-[#52b5a5] flex justify-end items-center px-3  gap-2 relative rounded-t-[20px]"
        >
          <button
            onClick={() => {
              setModalShow(false);
            }}
            className="w-[20px] h-full "
          >
            <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
          </button>
        </div>
        <div className="h-full w-full rounded-b-[20px] flex flex-col">
          <div
            className=" w-full h-full bg-white p-4 overflow-scroll scrollable "
            ref={scrollableRef}
          >
            {comments?.map((comment, index) => {
              // console.log(comment);
              return (
                <div
                  key={index}
                  className={`bubble ${comment.isYou === "1" ? "me" : "you"}`}
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
                        className="w-[400px] rounded border cursor-pointer hover:shadow"
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
          <div className=" w-full min-h-[60px] bg-gray-200 rounded-b-[20px] px-3 py-[10px] flex gap-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitComment();
              }}
              className="h-full w-full relative flex"
              action=""
            >
              <input
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                type="text"
                className="rounded h-full text-[14px] px-2 font-[400] w-full"
                autoFocus
              />
              <button type="button" className="">
                {/* Илгээх */}
              </button>
            </form>
            <div className="rounded bg-gray-400 p-1 top-[4px]  right-[calc(1%)] ml-2 flex items-center justify-center h-full">
              <div className="">
                <ImageUploading
                  multiple
                  value={images}
                  onChange={onChange}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                      <button
                        style={isDragging ? { color: "red" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        {imageList.length == 0 && (
                          <i className="bi bi-upload text-white"></i>
                        )}
                      </button>
                      &nbsp;
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image["data_url"]} alt="" width="100" />
                          <div className="image-item__btn-wrapper flex">
                            <button
                              onClick={() => onImageUpdate(index)}
                              className="px-2 py-1 rounded-full bg-emerald-500"
                            >
                              <i className="bi bi-arrow-counterclockwise text-white"></i>
                            </button>
                            <button
                              className="px-2 py-1 rounded-full bg-rose-500"
                              onClick={() => onImageRemove(index)}
                            >
                              <i className="bi bi-trash3-fill text-white"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;

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
