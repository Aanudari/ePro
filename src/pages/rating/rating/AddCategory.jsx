import React, {useEffect, useState} from "react";
import Navigation from "../../../components/Navigation";
import axios from "axios";
import {Modal} from "react-bootstrap";
import {useStateContext} from "../../../contexts/ContextProvider";

import { useLocation, useNavigate } from "react-router-dom"

function AddCategory({ show, voc, onClose, template_id }) {
    const navigate = useNavigate();
    const {TOKEN} = useStateContext();
    const [alert, setalert] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryMaxpoint, setCategoryMaxpoint] = useState("");
    const [formValues, setFormValues] = useState([{ name: "", maxPoints : "",}])
    const [catNameEmpty, checkCatNameEmpty] = useState(false);
    const [catPointEmpty, checkCatPointEmpty] = useState(false);


    const add_cat_data = {
        name: categoryName,
        maxPoints: categoryMaxpoint,
        subCategories: formValues.length === 1 ? formValues : [],
        templateId: template_id
    };

    const submitAddCategory = (e) => {
        e.preventDefault();
        axios({
            method: "post",
            headers: {
                "Authorization": `${TOKEN}`,
                "Content-Type": "application/json",
            },
            url: `http://192.168.10.248:9000/v1/Category/cat`,
            data: JSON.stringify(add_cat_data),
        })
            .then((res) => {
                console.log(res);
                if (res.data.isSuccess === true) {
                    console.log(res.data)
                    navigate(0);
                } else {
                    // setalert(true);
                    console.log(res.data);
                    console.log(res.data.resultMessage)
                }
            })
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setalert(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [alert]);

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }
    let addFormFields = () => {
        setFormValues([...formValues, { name: "", maxPoints: ""}])
    }
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
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
                       Ур чавдар үүсгэх
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>

                        <h6>Ур чавдар оруулна уу.</h6>
                        <a className="block mt-2 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ур чавдарын нэр</label>
                                    <input type="text"
                                           onChange={(e) => {
                                               setCategoryName(e.target.value);
                                               checkCatNameEmpty(false);
                                           }}
                                           id={catNameEmpty === true ? "border-red" : null}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required=""/>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ур чавдарын хувь %</label>
                                    <input type="number"
                                           name="maxPoints"
                                           onChange={(e) => {
                                               setCategoryMaxpoint(e.target.value);
                                               checkCatPointEmpty(false);
                                           }}
                                           id={catPointEmpty === true ? "border-red" : null}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required=""/>
                                </div>
                            </div>
                            </div>
                        </a>
                        <h6 className="py-2">Ур чавдарт харгалзах үзүүлэлт оруулна уу.</h6>
                        {formValues.map((element, index) => (
                            <a key={index} className="block mt-2 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                            <div className="flex flex-col justify-between p-4 leading-normal">
                                                <div className="grid gap-6 mb-6 md:grid-cols-2" >
                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Үзүүлэлтийн нэр</label>
                                                        <input type="text"
                                                               name="name"
                                                               value={element.name || ""}
                                                               onChange={e => handleChange(index, e)}
                                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                               required=""
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Үзүүлэлтийн хувь %</label>
                                                        <input type="number"
                                                               name="maxPoints"
                                                               value={element.maxPoints || ""}
                                                               onChange={e => handleChange(index, e)}
                                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                               required=""
                                                        />
                                                    </div>
                                                    {
                                                        index ?
                                                            <div className="button-section float-right px-2">
                                                            <button type="button"  onClick={() => removeFormFields(index)}
                                                                    className="block mt-2 inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                                            >Delete</button>
                                                            </div>
                                                            : null
                                                    }
                                                </div>
                                            </div>
                                            </a>
                        ))}

                        <div className="float-right">
                            <button onClick={submitAddCategory}
                                    className="mt-2 inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                                Ур чадвар үүсгэх
                            </button>
                        </div>

                        <div className="button-section float-right px-2">
                            <button type="button"
                                    className="mt-2 inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                    onClick={() => addFormFields()}>Үзүүлэлт нэмэх
                            </button>
                        </div>
                        <div className="relative bg-red-500 w-[300px] flex justify-center bg-red-100">
                            {""}
                            {alert ? (
                                <p className="absolute slice-top top-[10px] w-full rounded text-[15px] text-white h-full">
                                    Та буруу утга оруулсан байна.
                                </p>
                            ) : null}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>

    );
}


export default AddCategory;


