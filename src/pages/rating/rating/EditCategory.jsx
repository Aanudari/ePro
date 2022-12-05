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
    const [sub, setSub] = useState(category.category.subCategory);
    console.log(category.category);
    const updateState = (index) => (e) => {
        const newArray = sub.map((item, i) => {
            if (index === i) {
                return {...item, [e.target.name]: e.target.value};
            } else {
                return item;
            }
        });
        setSub(newArray);
    };
    const put_category = {
        id: category.category.id,
        name: catName === "" ? category.category.name : catName,
        maxPoints: catMaxPoints === "" ? category.category.maxPoints : catMaxPoints,
        subCategories: sub
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
                            <a className="block mt-2 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <h6 className="ml-2 mt-2">Category solih</h6>
                                <div className="flex flex-col justify-between p-4 leading-normal">
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
                                </div>
                            </a>
                            <a className="block mt-2 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <h6 className="ml-2 mt-2">Sub cat solih</h6>
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                <div className="grid gap-6 mb-6 lg:grid-cols-2">
                                {category.category.subCategory.map((datum, index) => (
                                    <div>
                                        <div key={datum.id}>
                                            <input type='hidden'
                                                   name="id"
                                                   defaultValue={datum.id}
                                                   onChange={updateState(index)}
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   required/>
                                        </div>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Name</label>
                                        <div key={datum.name}>
                                            <input type='text'
                                                   name="name"
                                                   defaultValue={datum.name}
                                                   onChange={updateState(index)}
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   required/>
                                        </div>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Maxpoints</label>
                                        <div key={datum.maxPoints}>
                                            <input type='number'
                                                   name="maxPoints"
                                                   defaultValue={datum.maxPoints}
                                                   onChange={updateState(index)}
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   required/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                                </div>
                            </a>
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
