import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import {Modal} from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import Navigation from "../../../components/Navigation";
import TemplateCell from "../rating/mappig/TemplateCell";
import Extras from "./mapRate/Extras";
import Category from "./mapRate/Category";

function CreateRate () {
    const navigate = useNavigate();
    const location = useLocation();
    let lastName = location.state.userinfo.lastName.slice(0, 1);
    const {TOKEN} = useStateContext();

    const format = "YYYYMMDDHHmmss";
    const format1 = "YYYY-MM-DD HH:mm:ss"
    let date = new Date();
    const realTime = moment(date).format(format1);
    const dateTime1 = moment(date).format(format);
    const followingDay = new Date(date.getTime() + 1209600000);
    const dateTime2 = moment(followingDay).format(format);

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear()
        navigate("/");
        window.location.reload();
    };

    const extras = location.state.template.extras;
    const category = location.state.template.categories;
    const [extraValues, setextraValues] = useState([]);
    const [catValues, setcatValues] = useState([]);
    const ratingtotal = 100;
    const create_rate_data = {
        userId: location.state.userinfo.deviceId,
        startDate: dateTime1,
        endDate: dateTime2,
        rating: ratingtotal,
        categories: catValues,
        extras: extraValues
    }

    const onSub = (e) => {
        e.preventDefault();

        axios({
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${TOKEN}`
            },
            url: `http://192.168.10.248:9000/v1/Rating`,
            data: JSON.stringify(create_rate_data),
        })
            .then((res) => {
                console.log(res)
                // if (res.data.result === "true") {
                //
                // } else {
                //
                // }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="w-full h-full min-h-screen bg-[#F3F4F6]">
            <Navigation/>
            <div className=" h-full">
                <div className="flex flex-wrap">
                    <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
                        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                                <div className="flex flex-wrap">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">Нэр:</h5>
                                        <span className="font-semibold text-sm text-blueGray-700">{lastName}. {location.state.userinfo.firstName}</span>
                                    </div>
                                    <div className="relative w-auto pl-4 flex-initial">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-red-500">
                                            <i className="bi bi-person-circle"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
                        <div
                            className="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                                <div className="flex flex-wrap">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">Level:</h5>
                                        <span className="font-semibold text-sm text-blueGray-700">{location.state.userinfo.roleName}</span>
                                    </div>
                                    <div className="relative w-auto pl-4 flex-initial">
                                        <div
                                            className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-pink-500">
                                            <i className="bi bi-person-lines-fill"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
                        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                                <div className="flex flex-wrap">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">Quarter:</h5>
                                        <span className="font-semibold text-sm text-blueGray-700">Q1</span>
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
                    <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
                        <div
                            className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                                <div className="flex flex-wrap">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">Эхлэх огноо:</h5>
                                        <span className="font-semibold text-sm text-blueGray-700">{realTime}</span>
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
                <div className="p-4 leading-normal bg-gray-100 flex items-center justify-center flex-col">
                        <div>
                            <h2 className="flex items-center font-semibold text-xl text-gray-600">{location.state.template.name}</h2>
                            <p className="text-gray-500 mb-6">Үнэлгээ өгөх</p>
                            <div>
                                <div className="bg-white rounded shadow-sm p-4 px-4 md:p-8 mb-6 grid gap-6 mb-6 md:grid-cols-3 p-0">
                                    {
                                        extras ? extras.map((data, index) =>
                                           <Extras key={index} data={data} extraValues={extraValues} setextraValues={setextraValues}/>
                                        ) : null
                                    }
                                </div>
                                <div>
                                    {
                                        category ? category.map((data, index) =>
                                            <Category key={index} data={data} catValues={catValues} setcatValues={setcatValues}/>
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>
                </div>
                <div className="button-section">
                    <div className="float-right">
                        <button type="submit"
                                onClick={onSub}
                                className="mt-0 mb-2 mr-6 inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                            SUBMIT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateRate;
