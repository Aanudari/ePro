import React, {useEffect, useState} from "react"
import Navigation from "../../../components/Navigation";
import {useLocation, useNavigate} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import axios from "axios";
import CategoryCell from "./mappig/CategoryCell";
import AddCategory from "./AddCategory";
import CreateTemplate from "./CreateTemplate";
import TemplateCell from "./mappig/TemplateCell";


function RatingIndexPage() {
    const logout = () => {
        localStorage.clear();
        sessionStorage.clear()
        navigate("/");
        window.location.reload();
    };
    const vocData = {
        voc1: { title: "Template үүсгэх"},
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
            url: `http://192.168.10.248:9000/v1/RatingTemplate`,
        })
            .then(
                res => {
                    setGetTemplate(res.data.result);
                    if (res.data.resultMessage === "Unauthorized"){
                        logout();
                    }
                }
            )
            .catch(err => console.log(err))
    }, []);



    return (
        <div className="w-full h-full bg-gray-50">
            <Navigation/>
            <div className="h-full flex">
                <div className='w-5/6 p-3 bg-gray-100'>
                             {
                                getTemplate ? getTemplate.map((data, index) =>
                                    <TemplateCell key={index} template={data}/>
                                ) : null
                            }
                </div>
                <div className='hidden md:block h-screen relative w-[280px]'>
                    <div className='fixed top-0 h-full w-full shadow-sm'>
                        <div className='h-14'/>
                        <div>
                            {vocToShow && (
                                <CreateTemplate template_id={getTemplate} show={vocToShow} voc={vocToShow} onClose={hideModal}  />
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
