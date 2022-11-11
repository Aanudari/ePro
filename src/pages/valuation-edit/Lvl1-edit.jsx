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
                        // console.log(res.data.result)
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
                        <h6>TOTAL </h6>
                    </div>
                    <div className='mt-3 w-full rounded-lg bg-white p-2 fw-bold'>
                        <h6>TOTAL 1/2</h6>
                        <div className="grid gap-6 mb-6 md:grid-cols-3" >
                        <a className="border-2">Дуудлага бүртгэл: </a>
                        <a className="border-2">Огноо: </a>
                        <a className="border-2">Утасны дугаар: </a>
                        </div>
                        <table id="example" className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th>Үзүүлэлт</th>
                                <th>Ур чадвар</th>
                                <th>Дуудлагын үнэлгээ 1/2</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>15</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>15</td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='mt-3 w-full rounded-lg bg-white p-2 fw-bold'>
                        <h6>TOTAL 2/2</h6>
                        <div className="grid gap-6 mb-6 md:grid-cols-3" >
                            <a className="border-2">Дуудлага бүртгэл: </a>
                            <a className="border-2">Огноо: </a>
                            <a className="border-2">Утасны дугаар: </a>
                        </div>
                        <table id="example" className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th>Үзүүлэлт</th>
                                <th>Ур чадвар</th>
                                <th>Дуудлагын үнэлгээ 1/2</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>15</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>15</td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
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
