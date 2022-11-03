import React, {useEffect, useState} from "react";
import Navigation from "../../Navigation";
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
    const [categoryDesc, setCategoryDesc] = useState("");
    const [formValues, setFormValues] = useState([{ name: "", description : "", points : "",}])
    const [catNameEmpty, checkCatNameEmpty] = useState(false);
    const [catPointEmpty, checkCatPointEmpty] = useState(false);
    const [catDescEmpty, checkCatDescEmpty] = useState(false);

    const add_cat_data = {
        name: categoryName,
        description: categoryDesc,
        maxPoints: categoryMaxpoint,
        subCategories: formValues,
        templateId: template_id.id
    };
    console.log(add_cat_data);
    const submitAddCategory = (e) => {
        e.preventDefault();
        if (categoryName.length === 0) {
            checkCatNameEmpty(true);
        } else if (categoryMaxpoint >= 0 && categoryMaxpoint <= 99) {
            checkCatPointEmpty(true);
            console.log("Үнэлгээний нийлбэр оноо бага байна.")
        } else if (categoryDesc.length === 0) {
            checkCatDescEmpty(true);
        } else {
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
                    if (res.data.isSuccess === "true") {
                        navigate(0);
                    } else {
                        setalert(true);
                        console.log(res.data)
                    }
                })
                .catch((err) => console.log(err));
        }
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
        setFormValues([...formValues, { name: "", description: "" , points: ""}])
    }
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    // console.log(formValues);
    // let addSubCategory = (event) => {
    //     event.preventDefault();
    // }

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
                        <h6>Үнэлгээгээ оруулна уу.</h6>
                        <a className="block mt-2 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Үнэлгээний нэр</label>
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
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Үнэлгээний нийт оноо</label>
                                    <input type="number"
                                           name="catPointSum"
                                           onChange={(e) => {
                                               setCategoryMaxpoint(e.target.value);
                                               checkCatPointEmpty(false);
                                           }}
                                           id={catPointEmpty === true ? "border-red" : null}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required=""/>
                                </div>
                            </div>
                                <div className="mb-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Үнэлгээний дэлгэрэнгүй</label>
                                    <input type="text"
                                           onChange={(e) => {
                                               setCategoryDesc(e.target.value);
                                               checkCatDescEmpty(false);
                                           }}
                                           id={catDescEmpty === true ? "border-red" : null}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required=""/>
                                </div>
                            </div>
                            </div>
                        </a>
                        <h6 className="py-2">Үнэлгээнд харгалзах ур чавдарын жагсаалтыг оруулна уу.</h6>
                        {formValues.map((element, index) => (
                            <a className="block mt-2 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                            <div className="flex flex-col justify-between p-4 leading-normal">
                                                <div className="grid gap-6 mb-6 md:grid-cols-2" key={index}>
                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ур чадварын нэр</label>
                                                        <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)}
                                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                               required=""
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ур чадварын оноо</label>
                                                        <input type="number" name="points" value={element.points || ""} onChange={e => handleChange(index, e)}
                                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                               required=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-6">
                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ур чадварын тайлбар</label>
                                                        <input type="text" name="description" value={element.description || ""} onChange={e => handleChange(index, e)}
                                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                               required=""
                                                        />
                                                        {
                                                            index ?
                                                                <button type="button"  onClick={() => removeFormFields(index)}
                                                                        className="block mt-2 inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                                                >Ур чадвар устгах</button>
                                                                : null
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                            </a>
                        ))}

                        <div className="float-right">
                            <button type="submit"
                                    onClick={submitAddCategory}
                                    className="mt-2 inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                                Үнэлгээг үүсгэх
                            </button>
                        </div>
                        <div className="button-section float-right px-2">
                            <button type="button"
                                    className="mt-2 inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                    onClick={() => addFormFields()}> Ур чадвар нэмэх
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
                    </form>
                </Modal.Body>
            </Modal>
        </div>

    );
}


export default AddCategory;


