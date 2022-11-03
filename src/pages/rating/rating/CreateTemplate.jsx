import {Modal} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import {useStateContext} from "../../../contexts/ContextProvider";
import {useNavigate} from "react-router-dom";

function CreateTemplate ({ show, voc, onClose }) {
    const navigate = useNavigate();
    const {TOKEN} = useStateContext();
    const [templateName, setTemplateName] = useState("");
    const [tempNameEmpty, checkTemplateNameEmpty] = useState(false);

    const post_template_date = {
        name: templateName,
        roleID: voc.content,
        categories: [],
    };
    console.log(post_template_date);
    const submitCreateTemplate = (e) => {
        e.preventDefault();
        if (templateName.length === 0) {
            checkTemplateNameEmpty(true);
        } else
        {
            axios({
                method: "post",
                headers: {
                    "Authorization": `${TOKEN}`,
                    "Content-Type": "application/json",
                },
                url: `http://192.168.10.248:9000/v1/RatingTemplate/add`,
                data: JSON.stringify(post_template_date),
            })
                .then((res) => {
                    if (res.data.isSuccess === "true") {
                        navigate(0);
                    } else {
                        navigate(0);
                        console.log(res.data)
                    }
                })
                .catch((err) => console.log(err));
        }
    }
    return (
        <div>
            <Modal
                size="lg"
                show={show}
                onHide={onClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby={`contained-modal-title-${voc.href}`}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id={`contained-modal-title-${voc.href}`}>
                        {voc.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <h6>Template үүсгэх нэрээ оруулна уу.</h6>
                        <a className="block mt-2 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Template нэр</label>
                                        <input type="text"
                                               onChange={(e) => {
                                                   setTemplateName(e.target.value);
                                                   checkTemplateNameEmpty(false);
                                               }}
                                               id={tempNameEmpty === true ? "border-red" : null}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               required=""/>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <div className="float-right">
                            <button type="submit"
                                    onClick={submitCreateTemplate}
                                    className="mt-2 inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                                Үнэлгээг үүсгэх
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export  default CreateTemplate;
