import React, {useEffect, useState} from "react"
import Navigation from "../../../components/Navigation";
import ValCell from "../../../components/sub-components/ValCell";
import CategoryCell from "../../../components/sub-components/category/categoryCell";
import AddCategory from "../../../components/sub-components/category/AddCategory";
import {useLocation, useNavigate} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import axios from "axios";
import CreateTemplate from "./CreateTemplate";
import TemplateMap from "./mappig/TemplateMap";

function RatingIndexPage() {

    const vocData = {
        voc1: { title: "Level 1 template үүсгэх", href: "#", content: "1" },
        voc2: { title: "Level 2 template үүсгэх", href: "#", content: "x" },
        voc3: { title: "Online template үүсгэх", href: "#", content: "x" },
        voc4: { title: "Branch template үүсгэх", href: "#", content: "x" },
        voc5: { title: "Засвар нярав template үүсгэх", href: "#", content: "x" },
        voc6: { title: "Telesales template үүсгэх", href: "#", content: "x" },
        voc7: { title: "Installer template үүсгэх", href: "#", content: "x" },
    };
    const [vocToShow, setVocToShow] = useState(null);
    const showModal = (voc) => setVocToShow(voc);
    const hideModal = () => setVocToShow(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [getTemplate, setGetTemplate] = useState();
    const {TOKEN} = useStateContext();

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Authorization": `${TOKEN}`,
                "accept": "text/plain",
            },
            url: `http://192.168.10.248:9000/v1/RatingTemplate/user/7862`,
        })
            .then(
                res => {
                    setGetTemplate(res.data.result);
                }
            )
            .catch(err => console.log(err))
    }, []);

    const deleteTemplate = () => {
        axios({
            method: "delete",
            headers: {
                "Authorization": `${TOKEN}`,
                "accept": "text/plain",
            },
            url: `http://192.168.10.248:9000/v1/RatingTemplate/${getTemplate.id}`,
        })
            .then(
                res => {
                    navigate(0);
                }
            )
            .catch(err => console.log(err))
    }
    return (
        <div className="w-full h-screen bg-gray-50 relative">
            <Navigation />
            <div className="h-full flex">
                <div className='w-5/6 p-3 bg-gray-100'>
                    <div
                        className="p-4 w-full bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h6 className="text-lg font-bold leading-none text-gray-900 dark:text-white">{getTemplate && getTemplate.name}</h6>
                            <button className="inline-block px-6 py-2 border-2 mr-0 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                    onClick={deleteTemplate}><i className="bi bi-trash"/> Delete Template</button>
                        </div>
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Category Name
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                Subcategory name
                                            </p>
                                        </div>
                                        <div
                                            className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            <a className="py-2 px-3 text-xs mr-2 bg-red-500 hover:bg-red-700 text-white rounded inline-flex items-center">
                                                Delete
                                            </a>
                                            <a className="py-2 px-3 text-xs bg-yellow-500 hover:bg-yellow-700 text-white rounded inline-flex items-center">
                                                Edit
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='hidden md:block h-screen relative w-[280px]'>
                    <div className='fixed top-0 h-full w-full shadow-sm'>
                        <div className='h-14'/>
                        <div>
                            {vocToShow && (
                                <CreateTemplate show={vocToShow} voc={vocToShow} onClose={hideModal} />
                            )}
                            <ul className="p-3">
                                {Object.keys(vocData).map((voc, key) => {
                                    // console.log(vocData[voc]);
                                    return (
                                        <li key={key} className="w-full h-12 cursor-pointer pl-4 hover:bg-gray-300 flex items-center ">
                                            <button onClick={() => showModal(vocData[voc])}>
                                                <small> <i className={`bi bi-bookmark-check`}/> {vocData[voc].title}</small>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RatingIndexPage;
