import React from 'react';
import Navigation from '../../components/Navigation';
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from "../../contexts/ContextProvider";
import CreateRate from "../rating/rate-users/CreateRate";
import moment from "moment";
import SelectRate from "../rating/rate-users/SelectRate";

function LeveloneEdit() {
    const logout = () => {
        localStorage.clear();
        sessionStorage.clear()
        navigate("/");
        window.location.reload();
    };
    const navigate = useNavigate();
    const location = useLocation();
    const {TOKEN} = useStateContext();
    const [showAlert, setShowAlert] = React.useState(true);
    const [msg, setMsg] = useState("");
    const vocData = {
        voc1: { title: "Үнэлгээ өгөх"},
    };
    const [vocToShow, setVocToShow] = useState(null);
    const showModal = (voc) => setVocToShow(voc);
    const hideModal = () => setVocToShow(null);

    const format = "YYYYMMDDHHmmss"
    let date = new Date();
    const dateTime = moment(date).format(format);

    const dates = {
        startDate: dateTime,
        endDate: dateTime
    };

    useEffect(() => {
        axios({
            method: "post",
            headers: {
                "Authorization": `${TOKEN}`,
                "Content-Type": "application/json",
            },
            url: `http://192.168.10.248:9000/v1/Rating/${location.state.deviceId}`,
            data: JSON.stringify(dates),
        })
            .then((res) => {
                if (res.data.resultMessage === "Unauthorized"){
                    logout();
                }
                if (res.data.isSuccess === true) {
                    console.log(res.data)
                    navigate(0);
                } else if (res.data.resultMessage === "No Result") {
                    setMsg(`${location.state.firstName} үнэлгээ хийгдээгүй байна.`)
                }

            })
            .catch((err) => console.log(err));
    })

    return (
        <div className="w-full h-full bg-gray-50">
            <Navigation/>
            <div className="h-full flex">
                <div className='w-5/6 p-3 bg-gray-100'>
                    {showAlert ? (
                        <div className={"text-white px-6 py-4 border-0 rounded relative mb-4 bg-blue-500"}>
                            <span className="text-xl inline-block mr-5 align-middle">
                                <i className="fas fa-bell" />
                            </span>
                            <span className="inline-block align-middle mr-8"><i className="bi bi-exclamation-triangle-fill"/> {msg}</span>
                            <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                                onClick={() => setShowAlert(false)}>
                                <span>×</span>
                            </button>
                        </div>
                    ) : null}
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
                                <SelectRate userdata={location.state.data} show={vocToShow} voc={vocToShow} onClose={hideModal}  />
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
