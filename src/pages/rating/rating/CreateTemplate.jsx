import {Modal} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import {useStateContext} from "../../../contexts/ContextProvider";
import {useNavigate} from "react-router-dom";
import {Logout} from "../../../auth/api";

function CreateTemplate ({ show, voc, onClose }) {
    const navigate = useNavigate();
    const {TOKEN} = useStateContext();
    const [templateName, setTemplateName] = useState("");
    const [tempNameEmpty, checkTemplateNameEmpty] = useState(false);
    const [templateRoleID, setTemplateRoleID] = useState("");
    const [tempRoleIDEmpty, checkTemplateRoleIDEmpty] = useState(false);

    const post_template_data = {
        name: templateName,
        roleID: templateRoleID,
        categories: []
    };
    console.log(post_template_data);
    const submitCreateTemplate = (e) => {
        e.preventDefault();
        if (templateName.length === 0) {
            checkTemplateNameEmpty(true);
        } else
        if (templateRoleID.length === 0) {
            checkTemplateRoleIDEmpty(true);
        } else
        {
            axios({
                method: "post",
                headers: {
                    "Authorization": `${TOKEN}`,
                    "Content-Type": "application/json",
                },
                url: `http://192.168.10.248:9000/v1/RatingTemplate/add`,
                data: JSON.stringify(post_template_data),
            })
                .then((res) => {
                    if (res.data.isSuccess === true) {
                        navigate(0);
                    } else {
                        if (res.data.resultMessage === "Unauthorized"){
                            Logout();
                        }
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
                // keyboard={false}
                dialogClassName="modal-90w"
                // aria-labelledby={`contained-modal-title-${voc.href}`}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id={`contained-modal-title-${voc.href}`}>
                        {voc.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mt-2">
                        <form  onSubmit={submitCreateTemplate}>
                            <a className="block mt-2 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <h6 className="p-2">Template үүсгэх</h6>
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
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Template user</label>
                                            <div className="relative">
                                                <select className="block w-full text-white py-2.5 px-3 pr-6 rounded leading-tight focus:outline-none"
                                                        onChange={(e) => {
                                                            setTemplateRoleID(e.target.value);
                                                            checkTemplateRoleIDEmpty(false);
                                                        }}
                                                        id={tempRoleIDEmpty === true ? "border-red" : null}>
                                                    <option>Ажлын байр</option>
                                                    <option value="1">Level 1</option>
                                                    <option value="2">Level 2</option>
                                                    <option>Online</option>
                                                    <option>Branch</option>
                                                    <option>Засвар, нярав</option>
                                                    <option>Telesales</option>
                                                    <option>Installer</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <i className="bi bi-caret-down-fill"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <div className="button-section">
                                <div className="float-right">
                                    <button type="submit"
                                            className="mt-2 inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                                        Template үүсгэх
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export  default CreateTemplate;
