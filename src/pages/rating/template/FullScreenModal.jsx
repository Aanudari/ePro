import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button, ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { logout } from "../../../service/examService";
import Card from "react-bootstrap/Card";
export default function FullScreenModal({
  show,
  setShow,
  setActiveMenu,
  setShowSide,
}) {
  const { TOKEN } = useStateContext();
  const [fullscreen, setFullscreen] = useState(true);
  const [tempVal, setTempVal] = useState("");

  let data = {
    isEdit: false,
    templateId: "",
    templateName: tempVal,
    categories: [
      {
        categoryId: "",
      },
    ],
  };
  const handleForm = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingTemplateNew/createTemplate`,
      data: data,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          toast.error(res.data.resultMessage, {
            position: "bottom-right",
          });
        } else {
          setTempVal("");
          setTrigger(!trigger);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [template, setTemplate] = useState();
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingTemplateNew/getTemplateList`,
    })
      .then((res) => {
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
        setTemplate(res.data.templates);
      })
      .catch((err) => console.log(err));
  }, [trigger]);
  //   console.log(template);
  const deleteTemplate = (id) => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingTemplateNew/deleteTemplate/${id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          toast.error(res.data.resultMessage, {
            position: "bottom-right",
          });
        }
        setTrigger(!trigger);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [showSmall, setShowSmall] = useState(false);

  const handleCloseSmall = () => setShowSmall(false);
  const handleShowSmall = () => setShowSmall(true);
  const [certainTemplate, setCertainTemplate] = useState(0);
  return (
    <div className="modal-index">
      <ToastContainer />
      <Modal
        show={show}
        fullscreen={fullscreen}
        onHide={() => {
          setShow(false);
          setActiveMenu(true);
          setShowSide(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Үнэлгээний загвар үүсгэх</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleForm(tempVal);
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <span className="font-[500] text-[15px] text-gray-500">
                  Тemplate нэр оруулна уу...
                </span>
              </Form.Label>
              <Form.Control
                value={tempVal}
                onChange={(e) => {
                  e.preventDefault();
                  setTempVal(e.target.value);
                }}
                type="text"
                placeholder=""
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            {tempVal == "" ? (
              <Button variant="primary" type="submit" disabled>
                Үүсгэх
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Үүсгэх
              </Button>
            )}
          </Form>
          <div className="flex gap-2 mt-3 flex-wrap">
            {template?.map((el, ix) => (
              <Card key={ix} style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Text>
                    {el.templateName == "" ? (
                      "no name recorded"
                    ) : (
                      <span className="font-[500] text-[14px] text-gray-500">
                        {el.templateName}
                      </span>
                    )}
                  </Card.Text>
                  {/* <Card.Title>{el.templateName}</Card.Text> */}
                  <div className="w-full flex justify-between">
                    <button
                      onClick={() => {
                        handleShowSmall();
                        setCertainTemplate(el.templateId);
                      }}
                      className="font-[500] text-[13px] text-gray-500"
                    >
                      Дэлгэрэнгүй
                    </button>
                    <Button
                      onClick={() => {
                        deleteTemplate(el.templateId);
                      }}
                      variant="primary"
                    >
                      Засах
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Modal.Body>
        {SmallModal()}
      </Modal>
    </div>
  );

  function SmallModal() {
    const handleCategory = (value) => {
      console.log(schema);
    };
    const [catValue, setCatValue] = useState("");
    let schema = {
      isEdit: false,
      templateId: certainTemplate,
      categoryId: "",
      categoryName: catValue,
      subCategories: [
        {
          subcategoryName: "",
          subcategoryPoint: "",
        },
      ],
    };
    return (
      <>
        <Modal
          show={showSmall}
          onHide={handleCloseSmall}
          size="lg"
          fullscreen={fullscreen}
        >
          <Modal.Header closeButton>
            <Modal.Title>Категори {certainTemplate}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleCategory(tempVal);
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  <span className="font-[500] text-[15px] text-gray-500">
                    Категори нэр оруулна уу...
                  </span>
                </Form.Label>
                <Form.Control
                  value={catValue}
                  onChange={(e) => {
                    e.preventDefault();
                    setCatValue(e.target.value);
                  }}
                  type="text"
                  placeholder=""
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              {catValue == "" ? (
                <Button variant="primary" type="submit" disabled>
                  Үүсгэх
                </Button>
              ) : (
                <Button variant="primary" type="submit">
                  Үүсгэх
                </Button>
              )}
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
