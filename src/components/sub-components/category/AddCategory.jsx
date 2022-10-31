import React, {useEffect, useState} from "react";
import Navigation from "../../Navigation";
import axios from "axios";
import {Modal} from "react-bootstrap";
import {useStateContext} from "../../../contexts/ContextProvider";

import { useLocation, useNavigate } from "react-router-dom"

function AddCategory({ show, voc, onClose, template_id }) {
    const {TOKEN} = useStateContext();
    const navigate = useNavigate();
    const [alert, setalert] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryMaxpoint, setCategoryMaxpoint] = useState("");
    const [categoryDesc, setCategoryDesc] = useState("");
    const [formValues, setFormValues] = useState([{ sub_name: "", sub_maxpoint : "", sub_descri : "",}])
    const [catNameEmpty, checkCatNameEmpty] = useState(false);
    const [catPointEmpty, checkCatPointEmpty] = useState(false);
    const [catDescEmpty, checkCatDescEmpty] = useState(false);
    console.log(formValues)
    const add_cat_data = {
        name: categoryName,
        description: categoryDesc,
        maxPoints: categoryMaxpoint,
        // subCategories: [],
        templateId: template_id.id
    };
    console.log(add_cat_data);
    const submitAddCategory = (e) => {
        e.preventDefault();
        if (categoryName.length === 0) {
            checkCatNameEmpty(true);
        } else if (categoryMaxpoint.length === 0) {
            checkCatPointEmpty(true);
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
                    console.log(res);
                    navigate(0);
                    // if (res.data.isSuccess === "true") {
                    //     navigate(0);
                    // } else {
                    //     setalert(true);
                    // }
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
        setFormValues([...formValues, { sub_name: "", sub_maxpoint: "" , sub_descri: ""}])
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
            <Modal.Body>{template_id.id}
                <form>
                    <h6>Үнэлгээгээ оруулна уу.</h6>
                    <div>
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

                    <h6>Үнэлгээнд харгалзах ур чавдарын жагсаалтыг оруулна уу.</h6>
                    <form>
                        {formValues.map((element, index) => (
                            <div>
                            <div className="grid gap-6 mb-6 md:grid-cols-2" key={index}>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ур чадварын нэр</label>
                                        <input type="text" name="sub_name" value={element.sub_name || ""} onChange={e => handleChange(index, e)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               required=""
                                        />
                                    </div>
                                   <div>
                                       <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ур чадварын оноо</label>
                                       <input type="number" name="sub_maxpoint" value={element.sub_maxpoint || ""} onChange={e => handleChange(index, e)}
                                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                              required=""
                                       />
                                   </div>
                            </div>
                            <div className="mb-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ур чадварын тайлбар</label>
                                    <input type="text" name="sub_descri" value={element.sub_descri || ""} onChange={e => handleChange(index, e)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required=""
                                    />
                                    {
                                        index ?
                                            <button type="button"  onClick={() => removeFormFields(index)}
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >Устгах</button>
                                            : null
                                    }
                                </div>
                            </div>
                            </div>
                        ))}
                        <div className="button-section">
                            <button type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => addFormFields()}> Нэмэх
                            </button>
                            <button className="btn btn-success" type="submit">Submit</button>
                        </div>
                    </form>

                    <button type="submit"
                            onClick={submitAddCategory}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Үүсгэх
                    </button>
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
    );
}


export default AddCategory;


