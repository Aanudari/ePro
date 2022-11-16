import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import {Modal} from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import Navigation from "../../../components/Navigation";

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

    const [getRateTemplate, setGetRateTemplate] = useState("");
    const [extraValues, setextraValues] = useState();

    const [catMaxPoint, setcatMaxPoint] = useState("");
    const [subMaxPoint, setsubMaxPoint] = useState("");


    const total = 100;

    // const create_rate_data = {
    //     userId: deviceId,
    //     startDate: dateTime1,
    //     endDate: dateTime2,
    //     rating: total,
    //     categories: [
    //         {
    //             id: "521",
    //             points: "521 idtai catiin onoo",
    //             subCategory: [
    //                 {
    //                     id: "381",
    //                     points: "381 idtai subiin onoo"
    //                 }
    //             ]
    //         }
    //     ],
    //     extras: extraValues
    // }
    console.log(location.state.template.categories);
    console.log(location.state.template.extras);

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
                            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">

                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                    <div className="text-gray-600">
                                        <p className="font-medium text-lg">Personal Details</p>
                                        <p>Please fill out all the fields.</p>
                                    </div>
                                    <div className="lg:col-span-2">
                                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                            <div className="md:col-span-5">
                                                <label htmlFor="full_name">Full Name</label>
                                                <input type="text" name="full_name" id="full_name"
                                                       className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                       value=""/>
                                            </div>

                                            <div className="md:col-span-5">
                                                <label htmlFor="email">Email Address</label>
                                                <input type="text" name="email" id="email"
                                                       className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                       value="" placeholder="email@domain.com"/>
                                            </div>

                                            <div className="md:col-span-3">
                                                <label htmlFor="address">Address / Street</label>
                                                <input type="text" name="address" id="address"
                                                       className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                       value="" placeholder=""/>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label htmlFor="city">City</label>
                                                <input type="text" name="city" id="city"
                                                       className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                       value="" placeholder=""/>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label htmlFor="country">Country / region</label>
                                                <div
                                                    className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                    <input name="country" id="country" placeholder="Country"
                                                           className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                                           value=""/>
                                                    <button tabIndex="-1"
                                                            className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                        <svg className="w-4 h-4 mx-2 fill-current"
                                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                             stroke="currentColor" stroke-width="2"
                                                             stroke-linecap="round" stroke-linejoin="round">
                                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                                        </svg>
                                                    </button>
                                                    <button tabIndex="-1" htmlFor="show_more"
                                                            className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                        <svg className="w-4 h-4 mx-2 fill-current"
                                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                             stroke="currentColor" stroke-width="2"
                                                             stroke-linecap="round" stroke-linejoin="round">
                                                            <polyline points="18 15 12 9 6 15"></polyline>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label htmlFor="state">State / province</label>
                                                <div
                                                    className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                    <input name="state" id="state" placeholder="State"
                                                           className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                                           value=""/>
                                                    <button tabIndex="-1"
                                                            className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                        <svg className="w-4 h-4 mx-2 fill-current"
                                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                             stroke="currentColor" stroke-width="2"
                                                             stroke-linecap="round" stroke-linejoin="round">
                                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                                        </svg>
                                                    </button>
                                                    <button tabIndex="-1" htmlFor="show_more"
                                                            className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                        <svg className="w-4 h-4 mx-2 fill-current"
                                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                             stroke="currentColor" stroke-width="2"
                                                             stroke-linecap="round" stroke-linejoin="round">
                                                            <polyline points="18 15 12 9 6 15"></polyline>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="md:col-span-1">
                                                <label htmlFor="zipcode">Zipcode</label>
                                                <input type="text" name="zipcode" id="zipcode"
                                                       className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                       placeholder="" value=""/>
                                            </div>

                                            <div className="md:col-span-5">
                                                <div className="inline-flex items-center">
                                                    <input type="checkbox" name="billing_same" id="billing_same"
                                                           className="form-checkbox"/>
                                                    <label htmlFor="billing_same" className="ml-2">My billing
                                                        address is different than above.</label>
                                                </div>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label htmlFor="soda">How many soda pops?</label>
                                                <div
                                                    className="h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                    <button tabIndex="-1" htmlFor="show_more"
                                                            className="cursor-pointer outline-none focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             className="h-4 w-4 mx-2" viewBox="0 0 20 20"
                                                             fill="currentColor">
                                                            <path fill-rule="evenodd"
                                                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                  clip-rule="evenodd"/>
                                                        </svg>
                                                    </button>
                                                    <input name="soda" id="soda" placeholder="0"
                                                           className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent"
                                                           value="0"/>
                                                    <button tabIndex="-1" htmlFor="show_more"
                                                            className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             className="h-4 w-4 mx-2 fill-current"
                                                             viewBox="0 0 20 20" fill="currentColor">
                                                            <path fill-rule="evenodd"
                                                                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                                                  clip-rule="evenodd"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            {/*<div className="md:col-span-5 text-right">*/}
                                            {/*    <div className="inline-flex items-end">*/}
                                            {/*        <button*/}
                                            {/*            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit*/}
                                            {/*        </button>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default CreateRate;
