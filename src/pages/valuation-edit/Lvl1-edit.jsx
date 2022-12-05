import React from 'react';
import Navigation from '../../components/Navigation';
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from "../../contexts/ContextProvider";
import moment from "moment";
import Accordion from "./Accordion";
import CreateComment from "../rating/comment/CreateComment";
import SelectRate from "../rating/rate-users/SelectRate";
import IndexComment from "../rating/comment/IndexComment";
import TemplateCell from "../rating/rating/mappig/TemplateCell";



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
    const dID = location.state.data.deviceId;
    const [showComment, setShowComment] = useState(false);
    const handleCloseComment = () => setShowComment(false);
    const handleShowComment = () => setShowComment(true);
    const [showSelectRate, setShowSelectRate] = useState(false);
    const handleCloseRate = () => setShowSelectRate(false);
    const handleShowRate = () => setShowSelectRate(true);
    const [open, setOpen] = useState(true);
    const [rate, setRate] = useState();

    const format = "YYYYMMDDHHmmss"
    let date = new Date();
    const dateTime = moment(date).format(format);
    console.log(rate);
    const dates = {
        startDate: "",
        endDate: ""
    };
    useEffect(() => {
        axios({
            method: "post",
            headers: {
                "Authorization": `${TOKEN}`,
                "Content-Type": "application/json",
            },
            url: `http://192.168.10.248:9000/v1/Rating/${dID}`,
            data: JSON.stringify(dates),
        })
            .then((res) => {
                if (res.data.resultMessage === "Unauthorized") {
                    logout();
                } else if (res.data.isSuccess === true) {
                    setRate(res.data.ratings);
                } else if (res.data.resultMessage === "No Result") {
                    setMsg(`${location.state.firstName} үнэлгээ хийгдээгүй байна.`)
                } else if (res.data.resultMessage === "Success") {
                    setMsg(`${location.state.firstName}`)
                }

            })
            .catch((err) => console.log(err));
    }, []);

    const Menus = [
        { title: "Accounts", src: "User", gap: true },
        { title: "Schedule ", src: "Calendar" },
    ];

    return (
        <div className="w-full h-full bg-gray-50">
            <Navigation/>
            <div className="h-full flex">
                <div className='w-full p-3 bg-gray-100'>
                    {showAlert ? (
                        <div className={"text-white px-6 py-4 border-0 rounded relative mb-4 bg-blue-500"}>
                            <span className="text-xl inline-block mr-5 align-middle">
                                <i className="fas fa-bell"/>
                            </span>
                            <span className="inline-block align-middle mr-8"><i className="bi bi-user"/> {msg}</span>
                            <button
                                className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                                onClick={() => setShowAlert(false)}>
                                <span>×</span>
                            </button>
                        </div>
                    ) : null}
                    <div className='w-full rounded-lg bg-white p-2 fw-bold'>
                        <h5>TOTAL </h5>
                    </div>
                    {
                        rate ? rate.map((data, index) =>
                            <div key={index} className='mt-3 w-full rounded-lg bg-white p-2 fw-bold'>
                                <h5>TOTAL 1/2 үнэлгээний нийт хувь: {data.rating}%</h5>
                                <div className="flex flex-wrap">
                                    <div className="mt-3 w-full lg:w-6/12 xl:w-4/12 px-2">
                                        <div
                                            className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-sm">
                                            <div className="flex-auto p-4">
                                                <div className="flex flex-wrap">
                                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">Үнэлгээг
                                                            үүсэгсэн огноо:</h5>
                                                        <span
                                                            className="font-semibold text-sm text-blueGray-700">{data.createdDate}</span>
                                                    </div>
                                                    <div className="relative w-auto pl-4 flex-initial">
                                                        <div
                                                            className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-blue-500">
                                                            <i className="bi bi-calendar-range"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 w-full lg:w-6/12 xl:w-4/12 px-2">
                                        <div
                                            className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-sm">
                                            <div className="flex-auto p-4">
                                                <div className="flex flex-wrap">
                                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">Үнэлгээ
                                                            эхлэх огноо:</h5>
                                                        <span
                                                            className="font-semibold text-sm text-blueGray-700">{data.startDate}</span>
                                                    </div>
                                                    <div className="relative w-auto pl-4 flex-initial">
                                                        <div
                                                            className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-emerald-500">
                                                            <i className="bi bi-calendar"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 w-full lg:w-6/12 xl:w-4/12 px-2">
                                        <div
                                            className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-sm">
                                            <div className="flex-auto p-4">
                                                <div className="flex flex-wrap">
                                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">Үнэлгээ
                                                            дуусах огноо: </h5>
                                                        <span
                                                            className="font-semibold text-sm text-blueGray-700"> {data.endDate}</span>
                                                    </div>
                                                    <div className="relative w-auto pl-4 flex-initial">
                                                        <div
                                                            className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-emerald-500">
                                                            <i className="bi bi-calendar"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-6 mb-6 md:grid-cols-3 mt-5 px-2 border-2">
                                    {data ? data.extras.map((data, index) =>
                                        <div key={index}>
                                            <a className="text-black">{data.name}: <p> {data.value}</p></a>
                                        </div>
                                    ) : null
                                    }
                                </div>
                                {data ? data.categories.map((data, index) =>
                                    <div key={index}>
                                        <h6 className="border-2">Ур чадварын нэр: {data.name}</h6>
                                        <table id="example" className="table table-striped table-bordered">
                                            <thead>
                                            <tr>
                                                <th>Үзүүлэлтийн нэр</th>
                                                <th>Үзүүлэлтийн хувь</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>2</td>
                                                <td>15</td>
                                                <td>
                                                    <button className="btn btn-sm btn-warning">edit</button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ) : null
                                }
                            </div>
                        ) : null
                    }
                </div>
                <div className="flex">
                    <div className={`${open ? "w-72" : "w-20"} bg-white h-screen p-1 pt-3 relative duration-300`}>
                        <i className={`bi bi-arrow-right-circle-fill absolute cursor-pointer-left-2 top-10 w-10 border-black-300
           border-4 rounded-full ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}/>
                        <div className="flex gap-x-4 items-center">
                            <i
                                className={`cursor-pointer duration-500 ${
                                    open && "rotate-[360deg]"
                                }`}
                            />
                            <h5 className={`text-black origin-left font-medium text-sm duration-200 ${
                                !open && "scale-0"
                            }`}
                            >
                                Хэрэглэгчийн цэс
                            </h5>
                        </div>
                        <ul className="pt-10 pl-3">
                            <li  className={`flex rounded-md p-2 cursor-pointer hover:bg-blue text-gray-500 text-sm 
                                    items-right gap-x-3 bg-light-white`}>
                                <i className="bi bi-alarm" />
                                <span className={`${!open && "hidden"} origin-right duration-300`}>
                                         <SelectRate userdata={location.state.data} show={showSelectRate}
                                                     handleClose={handleCloseRate}
                                                     handleShow={handleShowRate}/>
                                    </span>
                            </li>
                            <li  className={`flex rounded-md p-2 cursor-pointer hover:bg-blue text-gray-500 text-sm 
                                    items-center gap-x-3 bg-light-white`}>
                                <i className="bi bi-alarm" />
                                <span className={`${!open && "hidden"} origin-right duration-300`}>
                            <CreateComment show={showComment} handleClose={handleCloseComment}
                                           handleShow={handleShowComment}/>
                                     </span>
                            </li>
                        </ul>
                        <div>
                            {
                                rate ? rate.map((data, index) =>
                                    <IndexComment key={index} rate={data}/>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
                {/*<aside className="flex h-screen w-[300px] flex-col border-l border-gray-200 bg-white">*/}
                {/*    <div className="flex flex-1 flex-col overflow-y-scroll">*/}
                {/*        <div className="border-b border-gray-200 py-4 px-6">*/}
                {/*            <button className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5">*/}

                {/*            </button>*/}
                {/*            <button className="mt-2 flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5">*/}

                {/*            </button>*/}
                {/*        </div>*/}
                {/*        <Accordion title="layout">*/}
                {/*            <div className="flex items-center justify-between">*/}
                {/*                <button className="rounded-lg border border-gray-200 p-2 hover:bg-gray-100">*/}
                {/*                    <i className="bi bi-calendar h-5 w-5 stroke-current text-gray-400" /> User list*/}
                {/*                </button>*/}
                {/*            </div>*/}
                {/*        </Accordion>*/}
                {/*    </div>*/}
                {/*</aside>*/}
            </div>
        </div>
    );
}
export default LeveloneEdit;

