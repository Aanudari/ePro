import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import axios from "axios";
import Navigation from "../../../components/Navigation";
import CategoryCell from "../../../components/sub-components/category/categoryCell";
import AddCategory from "../../../components/sub-components/category/AddCategory";


function RatingPage() {
    const vocData = {
        voc1: { title: "Үнэлгээ нэмэх"},
    };
    const [vocToShow, setVocToShow] = useState(null);
    const showModal = (voc) => setVocToShow(voc);
    const hideModal = () => setVocToShow(null);
    const navigate = useNavigate();
    const location = useLocation();
    const {TOKEN, deviceId} = useStateContext();
    const [template, setTemplate] = useState();
    const [alert, setalert] = useState(false);

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Authorization": `${TOKEN}`,
                "accept": "text/plain",
            },
            url: `http://192.168.10.248:9000/v1/RatingTemplate/user/${deviceId}`,
        })
            .then(
                res => {
                    setalert(res.data.resultMessage);
                }
            )
            .catch(err => console.log(err))
    }, []);

    return (
        <div>rating page
            <div className="w-full h-full bg-gray-50">
                <Navigation/>
                <div className="h-full flex">
                    <div className='w-5/6 p-3 bg-gray-100'>
                        <div className='w-full rounded-lg bg-white p-2 fw-bold'>
                            <h5> Үнэлгээний загвар</h5>
                                <div>
                                    {alert}
                                </div>
                            <div>
                                {
                                    template ? template.categories.map((data, index) =>
                                        <CategoryCell key={index} category={data}/>
                                    ) : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className='hidden md:block h-screen relative w-[280px]'>
                        <div className='fixed top-0 h-full w-full shadow-sm'>
                            <div className='h-14'/>
                            <div >
                                {vocToShow && (
                                    <AddCategory template_id={template} show={vocToShow} voc={vocToShow} onClose={hideModal} />
                                )}
                                <ul className="p-3">
                                    {Object.keys(vocData).map((voc, key) => {
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
        </div>
    )
}


export default RatingPage;
