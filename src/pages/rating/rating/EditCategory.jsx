import React, {useState, useEffect, useRef} from 'react'
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import {Modal} from "react-bootstrap";
import axios from "axios";

function EditCategory ({ show, voc, onClose, category}) {
    const navigate = useNavigate();
    const {TOKEN} = useStateContext();
    const [catName, setCatName] = useState("");
    const [catMaxPoints, setCatMaxPoints] = useState("");
    const [formValues, setFormValues] = useState([{id: "", name: "", maxPoints : "",}])

    const put_category = {
        id: category.category.id,
        name: catName === "" ? category.category.name : catName,
        maxPoints: catMaxPoints === "" ? category.category.maxPoints : catMaxPoints,
        subCategory: formValues
    }
    console.log(put_category);
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }
    const editCategory = () => {
        axios({
            method: "put",
            headers: {
                "Authorization": `${TOKEN}`,
                "Content-Type": "application/json",
            },
            url: `http://192.168.10.248:9000/v1/Category/cat/${category.category.id}`,
            data: put_category
        })
            .then(
                res => {
                    console.log(res.data.result);
                    if (res.data.isSuccess === true) {
                        navigate(0);
                    } else {
                        console.log(res.data.resultMessage);
                    }
                }
            )
            .catch(err => console.log(err))
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
                    <div className="max-w-auto mx-auto bg-white p-4">
                        <form>
                            <div className="grid gap-6 mb-6 lg:grid-cols-2">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Category нэр</label>
                                    <input type='text'
                                           defaultValue={category.category.name}
                                           onChange={(e) => {
                                               setCatName(e.target.value);
                                           }}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required/>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Нийт оноо</label>
                                    <input type='number'
                                           onChange={(e) => {
                                               setCatMaxPoints(e.target.value);
                                           }}
                                           defaultValue={catMaxPoints || category.category.maxPoints}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required/>
                                </div>
                            </div>
                            <div className="grid gap-6 mb-6 lg:grid-cols-2">
                                {formValues.map((element, index) => (
                                    <div key={index} className="grid gap-6 mb-6 lg:grid-cols-2">
                                        {
                                            category.category ? category.category.subCategory.map((data, index) =>
                                                <input key={index}
                                                       type="hidden" name="id" value={element.id || data.id}
                                                       onChange={e => handleChange(index, e)}
                                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                       required/>
                                            ) : null
                                        }
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ур чадварын нэр</label>
                                            {
                                                category.category ? category.category.subCategory.map((data, index) =>
                                                    <input key={index}
                                                           type="text" name="name" value={element.name || data.name}
                                                           onChange={e => handleChange(index, e)}
                                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                           required/>
                                                ) : null
                                            }
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ур чадварын оноо</label>
                                            {
                                                category.category ? category.category.subCategory.map((data, index) =>
                                                    <input key={index}
                                                           type="number" name="maxPoints" value={element.maxPoints || data.maxPoints}
                                                           onChange={e => handleChange(index, e)}
                                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                           required/>
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="float-right">
                                <button type="submit"
                                        onClick={editCategory}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default EditCategory;
