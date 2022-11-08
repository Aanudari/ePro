import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import {Modal} from "react-bootstrap";
import axios from "axios";
import CategoryCell from "./mappig/CategoryCell";

function EditCategory ({ show, voc, onClose, category}) {
    const navigate = useNavigate();
    const {TOKEN} = useStateContext();
    const [value, setValue] = useState();

    console.log(category.category);

    const editCategory = () => {
        axios({
            method: "put",
            headers: {
                "Authorization": `${TOKEN}`,
                "Content-Type": "application/json",
            },
            url: `http://192.168.10.248:9000/v1/Category/cat/${category.category.id}`,
            data: {}
        })
            .then(
                res => {
                    if (res.data.isSuccess === true) {
                        navigate(0);
                    } else {
                        console.log(res.data.resultMessage);
                    }
                }
            )
            .catch(err => console.log(err))
    }

    const handleInputChange = (e) => {
        console.log(e.target.value);
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
                                        <input type='text' onChange={handleInputChange}
                                               defaultValue={category.category.name}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               required/>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Нийт оноо</label>
                                        <input type='number' onChange={handleInputChange}
                                               defaultValue={category.category.maxPoints}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               required/>
                                    </div>
                                </div>
                                <div className="grid gap-6 mb-4 lg:grid-cols-2">
                                    {
                                        category.category ? category.category.subCategory.map((data, index) =>
                                            <input  type='text' onChange={handleInputChange}
                                                    defaultValue={data.name}
                                                   className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        ) : null
                                    }
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                                    <input type="password" id="password"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="•••••••••" required/>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="confirm_password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm
                                        password</label>
                                    <input type="password" id="confirm_password"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="•••••••••" required/>
                                </div>
                                <button type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                                </button>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
export default EditCategory;
