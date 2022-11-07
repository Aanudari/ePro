import React from 'react';
import Navigation from '../../components/Navigation';
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from "../../contexts/ContextProvider";
import CreateTemplate from "../rating/rating/CreateTemplate";
import CreateRate from "../rating/rate-users/CreateRate";

function LeveloneEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const {TOKEN} = useStateContext();
    const [msg, setMsg] = useState();
    const [show, setshow] = useState(false);
    const [getRate, setGetRate] = useState();
    const vocData = {
        voc1: { title: "Үнэлгээ өгөх"},
    };
    const [vocToShow, setVocToShow] = useState(null);
    const showModal = (voc) => setVocToShow(voc);
    const hideModal = () => setVocToShow(null);

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Authorization": `${TOKEN}`,
                "accept": "text/plain",
            },
            url: `http://192.168.10.248:9000/v1/Rating/${location.state.deviceId}`,
        })
            .then(
                res => {
                    if(res.data.isSuccess === true){
                        setGetRate(res.data.result);
                    }
                    else if (res.data.ratings === null){
                        setMsg("Үнэлгээ хийгдээгүй байна.")
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
                    <div className='w-full rounded-lg bg-white p-2 fw-bold'>
                        <h6>{msg}</h6>
                    </div>
                </div>
                <div className='hidden md:block h-screen relative w-[280px]'>
                    <div className='fixed top-0 h-full w-full shadow-sm'>
                        <div className='h-14'/>
                        <div>
                            {vocToShow && (
                                <CreateRate deviceId={location.state.deviceId} show={vocToShow} voc={vocToShow} onClose={hideModal}  />
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
    );
}


export default LeveloneEdit;
