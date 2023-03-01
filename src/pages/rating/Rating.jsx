import RatingLayout from "./RatingLayout";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import tempAPI from "../../service/templateAPI";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useStateContext } from "../../contexts/ContextProvider";
import { logout } from "../../service/examService";
function Rating() {
  const [temps, setTemps] = useState();
  useEffect(() => {
    tempAPI.getTemaplates().then((res) => {
      if (res.data.isSuccess === true) {
        setTemps(res.data.templates);
      } else {
        logout();
        alert(res.data.resultMessage);
      }
    });
  }, []);
  return (
    <RatingLayout>
      <div className="w-full h-full flex bg-teal-500 ">
        <div className="w-full h-16 px-3 flex gap-4 items-center justify-end ">
          <OffcanvasCustom temps={temps} />
          <OffcanvasCustomRating />
          <button className="custom-btn btn-18">
            <span className="font-[500]">Comment</span>
            <span className="font-[500]">Сэтгэгдэл</span>
          </button>
          {/* <button className="custom-btn btn-13">Read More</button> */}
        </div>
      </div>
    </RatingLayout>
  );
}

export default Rating;

function OffCanvasCus({ name, temps, ...props }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={handleShow} className="custom-btn btn-12">
        <span className="font-[500]">Template</span>
        <span className="font-[500]">Загвар</span>
      </button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <span className="!text-[16px] font-[500] text-white">
              Загварууд
            </span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="w-full h-full  shadow-inner flex flex-col gap-2 relative">
            {temps?.map((item, index) => (
              <button
                onClick={() => {
                  navigate("/template", {
                    state: { template: item },
                  });
                }}
                key={index}
                className="custom-btn btn-16 w-full  rounded-none text-white text-sm"
              >
                {item.templateName}
              </button>
            ))}
            <div className="h-[56px] w-[400px] bg-red-100 fixed right-[-1px] bottom-0 bg-[#009797] flex px-3 py-2 justify-end">
              <button
                onClick={() => {
                  setModalShow(true);
                }}
                className="custom-btn btn-16 w-full  rounded-none text-white text-sm w-[100px]"
              >
                Нэмэх
              </button>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function OffcanvasCustom({ temps }) {
  return (
    <>
      {["end"].map((placement, idx) => (
        <OffCanvasCus
          key={idx}
          placement={placement}
          name={placement}
          temps={temps}
        />
      ))}
    </>
  );
}

function OffCanvasCusRating({ name, ...props }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow} className="custom-btn btn-17">
        <span className="font-[500]">Rating</span>
        <span className="font-[500]">Үнэлгээ</span>
      </button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>Rating</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function OffcanvasCustomRating() {
  return (
    <>
      {["end"].map((placement, idx) => (
        <OffCanvasCusRating key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

function MyVerticallyCenteredModal(props) {
  const [value, setValue] = useState("");
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <span className="font-[500] text-white text-[18px]">
            Загварын нэр оруулна уу.
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4></h4>
        <div className="group !w-full">
          <input
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="font-[400] text-[13px] "
            type="text"
            autoFocus
          />
          {/* {noti_examName && (
                      <i
                        className="bi bi-exclamation-lg text-2xl text-red-500
                                    animate-bounce absolute top-[10px] left-[-15px]"
                      ></i>
                    )} */}
          <span className="highlight"></span>
          <span className="bar "></span>
          {/* <label className="">Шалгалтын нэр</label> */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={props.onHide}
          className="custom-btn btn-16 w-full  rounded-none text-white text-sm w-[100px]"
        >
          Хаах
        </button>
      </Modal.Footer>
    </Modal>
  );
}
