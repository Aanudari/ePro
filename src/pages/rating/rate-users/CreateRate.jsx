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
    console.log(location.state.template);

    return (
        <div className="w-full h-full min-h-screen bg-[#35C5B2]">
            <Navigation/>
            <div className="h-full">
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <div className="grid gap-6 mb-6 md:grid-cols-4">
                        <div className="flex p-4 text-sm text-black bg-[#F3F4F6]">
                            <div>
                                <span className="font-medium">Нэр: </span>
                                {lastName}. {location.state.userinfo.firstName}
                            </div>
                        </div>
                        <div className="flex p-4 text-sm text-black bg-[#F3F4F6]">
                            <div>
                                <span className="font-medium">Level: </span>
                              {location.state.userinfo.roleName}
                            </div>
                        </div>
                        <div className="flex p-4 text-sm text-black bg-[#F3F4F6]">
                            <div>
                                <span className="font-medium">Quarter: </span>
                                Q1
                            </div>
                        </div>
                        <div className="flex p-4 text-sm text-black bg-[#F3F4F6]">
                            <div>
                                <span className="font-medium">Эхлэх огноо: </span>
                                {realTime}
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-1">
                        <div className="container mx-auto h-screen py-16 px-8 relative">
                            <div
                                className="flex w-full rounded-lg h-full lg:overflow-hidden overflow-auto lg:flex-row flex-col shadow-2xl">
                                <div className="lg:w-1/2 bg-white text-gray-800 flex flex-col">
                                    <div className="p-8 shadow-md relative bg-white">
                                        <div className="flex items-center">
                                            <img src="https://randomuser.me/api/portraits/men/1.jpg"
                                                 className="w-10 h-10 block rounded object-cover object-top"/>
                                            <div className="text-indigo-600 font-medium ml-3">Holden Caulfield</div>
                                            <button
                                                className="bg-indigo-100 text-indigo-400 ml-auto w-8 h-8 flex items-center justify-center rounded">
                                            </button>
                                        </div>
                                        <h1 className="font-medium text-lg mt-6">Contact List</h1>
                                        <p className="text-gray-600 text-sm">Fingerstache godard blog, cornhole meh
                                            hoodie</p>
                                        <div className="mt-6 flex">
                                            <button
                                                className="bg-indigo-500 text-white py-2 text-sm px-3 rounded focus:outline-none">New
                                                Contact
                                            </button>
                                            <button
                                                className="ml-4 text-gray-600 py-2 text-sm px-3 rounded focus:outline-none border border-gray-400">New
                                                Task
                                            </button>
                                            <div className="relative ml-auto flex-1 pl-8 sm:block hidden">
                                                <input placeholder="Search" type="text"
                                                       className="w-full border rounded border-gray-400 h-full focus:outline-none pl-4 pr-8 text-gray-700 text-sm text-gray-500"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="overflow-auto flex-grow">
                                        <div
                                            className="bg-gray-100 px-8 py-6 flex items-center border-b border-gray-300">
                                            <input type="checkbox"/>
                                            <div className="flex ml-4">
                                                <img src="https://randomuser.me/api/portraits/women/44.jpg"
                                                     className="w-10 h-10 object-cover rounded object-top"/>
                                                <div className="flex flex-col pl-4">
                                                    <h2 className="font-medium text-sm">Lucinda Massey</h2>
                                                    <h3 className="text-gray-500 text-sm">Management Consultant</h3>
                                                </div>
                                            </div>
                                            <button
                                                className="text-gray-500 flex items-center text-sm focus:outline-none rounded ml-auto py-2 leading-none">
                                                Edit
                                            </button>
                                        </div>
                                        <div
                                            className="bg-gray-200 px-8 py-6 flex items-center border-b border-gray-300">
                                            <input type="checkbox" checked/>
                                            <div className="flex ml-4">
                                                <img
                                                    src="https://pbs.twimg.com/profile_images/1000050491970260993/FJkauyEa.jpg"
                                                    className="w-10 h-10 object-cover rounded object-top"/>
                                                <div className="flex flex-col pl-4">
                                                    <h2 className="font-medium text-sm">Willie Becker</h2>
                                                    <h3 className="text-gray-500 text-sm">Business Manager</h3>
                                                </div>
                                            </div>
                                            <button
                                                className="text-gray-500 flex items-center text-sm focus:outline-none rounded ml-auto py-2 leading-none">
                                                <svg stroke="currentColor" stroke-width="2" fill="none"
                                                     stroke-linecap="round" stroke-linejoin="round"
                                                     className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="3"/>
                                                    <path
                                                        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                                                </svg>
                                                Edit
                                            </button>
                                        </div>
                                        <div
                                            className="bg-gray-100 px-8 py-6 flex items-center border-b border-gray-300">
                                            <input type="checkbox"/>
                                            <div className="flex ml-4">
                                                <img src="https://randomuser.me/api/portraits/women/63.jpg"
                                                     className="w-10 h-10 object-cover rounded object-top"/>
                                                <div className="flex flex-col pl-4">
                                                    <h2 className="font-medium text-sm">Sadie McDaniel</h2>
                                                    <h3 className="text-gray-500 text-sm">Product Manager</h3>
                                                </div>
                                            </div>
                                            <button
                                                className="text-gray-500 flex items-center text-sm focus:outline-none rounded ml-auto py-2 leading-none">
                                                <svg stroke="currentColor" stroke-width="2" fill="none"
                                                     stroke-linecap="round" stroke-linejoin="round"
                                                     className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="3"/>
                                                    <path
                                                        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                                                </svg>
                                                Edit
                                            </button>
                                        </div>
                                        <div
                                            className="bg-gray-100 px-8 py-6 flex items-center border-b border-gray-300">
                                            <input type="checkbox"/>
                                            <div className="flex ml-4">
                                                <img
                                                    src="https://pbs.twimg.com/profile_images/1157046181698011136/xZ4wg2Xj.jpg"
                                                    className="w-10 h-10 object-cover rounded object-top"/>
                                                <div className="flex flex-col pl-4">
                                                    <h2 className="font-medium text-sm">Maggie White</h2>
                                                    <h3 className="text-gray-500 text-sm">Financial Analyst</h3>
                                                </div>
                                            </div>
                                            <button
                                                className="text-gray-500 flex items-center text-sm focus:outline-none rounded ml-auto py-2 leading-none">
                                                <svg stroke="currentColor" stroke-width="2" fill="none"
                                                     stroke-linecap="round" stroke-linejoin="round"
                                                     className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="3"/>
                                                    <path
                                                        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                                                </svg>
                                                Edit
                                            </button>
                                        </div>
                                        <div
                                            className="bg-gray-100 px-8 py-6 flex items-center border-b border-gray-300">
                                            <input type="checkbox"/>
                                            <div className="flex ml-4">
                                                <img
                                                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=046c29138c1335ef8edee7daf521ba50"
                                                    className="w-10 h-10 object-cover rounded object-top"/>
                                                <div className="flex flex-col pl-4">
                                                    <h2 className="font-medium text-sm">Phoebe Roy</h2>
                                                    <h3 className="text-gray-500 text-sm">Financial Analyst</h3>
                                                </div>
                                            </div>
                                            <button
                                                className="text-gray-500 flex items-center text-sm focus:outline-none rounded ml-auto py-2 leading-none">
                                                <svg stroke="currentColor" stroke-width="2" fill="none"
                                                     stroke-linecap="round" stroke-linejoin="round"
                                                     className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="3"/>
                                                    <path
                                                        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                                                </svg>
                                                Edit
                                            </button>
                                        </div>
                                        <div
                                            className="bg-gray-100 px-8 py-6 flex items-center border-b border-gray-300">
                                            <input type="checkbox"/>
                                            <div className="flex ml-4">
                                                <img src="https://randomuser.me/api/portraits/women/44.jpg"
                                                     className="w-10 h-10 object-cover rounded object-top"/>
                                                <div className="flex flex-col pl-4">
                                                    <h2 className="font-medium text-sm">Lucinda Massey</h2>
                                                    <h3 className="text-gray-500 text-sm">Management Consultant</h3>
                                                </div>
                                            </div>
                                            <button
                                                className="text-gray-500 flex items-center text-sm focus:outline-none rounded ml-auto py-2 leading-none">
                                                <svg stroke="currentColor" stroke-width="2" fill="none"
                                                     stroke-linecap="round" stroke-linejoin="round"
                                                     className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="3"/>
                                                    <path
                                                        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                                                </svg>
                                                Edit
                                            </button>
                                        </div>
                                        <div
                                            className="bg-gray-100 px-8 py-6 flex items-center border-b border-gray-300">
                                            <input type="checkbox"/>
                                            <div className="flex ml-4">
                                                <img
                                                    src="https://pbs.twimg.com/profile_images/1000050491970260993/FJkauyEa.jpg"
                                                    className="w-10 h-10 object-cover rounded object-top"/>
                                                <div className="flex flex-col pl-4">
                                                    <h2 className="font-medium text-sm">Willie Becker</h2>
                                                    <h3 className="text-gray-500 text-sm">Business Manager</h3>
                                                </div>
                                            </div>
                                            <button
                                                className="text-gray-500 flex items-center text-sm focus:outline-none rounded ml-auto py-2 leading-none">
                                                <svg stroke="currentColor" stroke-width="2" fill="none"
                                                     stroke-linecap="round" stroke-linejoin="round"
                                                     className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="3"/>
                                                    <path
                                                        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                                                </svg>
                                                Edit
                                            </button>
                                        </div>
                                        <div
                                            className="bg-gray-100 px-8 py-6 flex items-center border-b border-gray-300">
                                            <input type="checkbox"/>
                                            <div className="flex ml-4">
                                                <img src="https://randomuser.me/api/portraits/women/63.jpg"
                                                     className="w-10 h-10 object-cover rounded object-top"/>
                                                <div className="flex flex-col pl-4">
                                                    <h2 className="font-medium text-sm">Sadie McDaniel</h2>
                                                    <h3 className="text-gray-500 text-sm">Product Manager</h3>
                                                </div>
                                            </div>
                                            <button
                                                className="text-gray-500 flex items-center text-sm focus:outline-none rounded ml-auto py-2 leading-none">
                                                <svg stroke="currentColor" stroke-width="2" fill="none"
                                                     stroke-linecap="round" stroke-linejoin="round"
                                                     className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="3"/>
                                                    <path
                                                        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                                                </svg>
                                                Edit
                                            </button>
                                        </div>
                                        <div
                                            className="bg-gray-100 px-8 py-6 flex items-center border-b border-gray-300">
                                            <input type="checkbox"/>
                                            <div className="flex ml-4">
                                                <img
                                                    src="https://pbs.twimg.com/profile_images/1157046181698011136/xZ4wg2Xj.jpg"
                                                    className="w-10 h-10 object-cover rounded object-top"/>
                                                <div className="flex flex-col pl-4">
                                                    <h2 className="font-medium text-sm">Maggie White</h2>
                                                    <h3 className="text-gray-500 text-sm">Financial Analyst</h3>
                                                </div>
                                            </div>
                                            <button
                                                className="text-gray-500 flex items-center text-sm focus:outline-none rounded ml-auto py-2 leading-none">
                                                <svg stroke="currentColor" stroke-width="2" fill="none"
                                                     stroke-linecap="round" stroke-linejoin="round"
                                                     className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="3"/>
                                                    <path
                                                        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                                                </svg>
                                                Edit
                                            </button>
                                        </div>
                                        <div
                                            className="bg-gray-100 px-8 py-6 flex items-center border-b border-gray-300">
                                            <input type="checkbox"/>
                                            <div className="flex ml-4">
                                                <img
                                                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=046c29138c1335ef8edee7daf521ba50"
                                                    className="w-10 h-10 object-cover rounded object-top"/>
                                                <div className="flex flex-col pl-4">
                                                    <h2 className="font-medium text-sm">Phoebe Roy</h2>
                                                    <h3 className="text-gray-500 text-sm">Financial Analyst</h3>
                                                </div>
                                            </div>
                                            <button
                                                className="text-gray-500 flex items-center text-sm focus:outline-none rounded ml-auto py-2 leading-none">
                                                <svg stroke="currentColor" stroke-width="2" fill="none"
                                                     stroke-linecap="round" stroke-linejoin="round"
                                                     className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="3"/>
                                                    <path
                                                        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                                                </svg>
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-1/2 bg-indigo-600 text-white flex flex-col">
                                    <div className="p-8 bg-indigo-700 flex items-center">
                                        <img src="https://pbs.twimg.com/profile_images/1000050491970260993/FJkauyEa.jpg"
                                             className="w-16 h-16 mr-4 object-top object-cover rounded"/>
                                        <div className="mr-auto">
                                            <h1 className="text-xl leading-none mb-1">Willie Becker</h1>
                                            <h2 className="text-indigo-400 text-sm">Business Manager</h2>
                                        </div>
                                        <button
                                            className="bg-indigo-600 text-white py-2 text-sm px-3 rounded focus:outline-none">New
                                            Task
                                        </button>
                                    </div>
                                    <div className="p-8 flex flex-1 items-start overflow-auto">
                                        <div className="flex-shrink-0 text-sm sticky top-0">
                                            <div className="flex items-center text-white mb-3">Open <span
                                                className="italic text-sm ml-1 text-indigo-300">(10)</span></div>
                                            <div className="flex items-center text-indigo-300 mb-3">In Progress <span
                                                className="italic text-sm ml-1">(8)</span></div>
                                            <div className="flex items-center text-indigo-300">Closed <span
                                                className="italic text-sm ml-1">(4)</span></div>
                                        </div>
                                        <div className="flex-1 pl-10">
                                            <div className="flex mb-8">
                                                <div
                                                    className="w-4 h-4 flex-shrink-0 rounded-full border-indigo-400 border-2 mt-1 mr-2"></div>
                                                <div className="flex-grow">
                                                    <h3 className="text-sm mb-1">Cronut distillery selfies, hella shabby
                                                        chic</h3>
                                                    <h4 className="text-xs text-indigo-300 italic">10 min ago</h4>
                                                </div>
                                                <button className="text-indigo-300 flex-shrink-0 ml-2">
                                                    <svg stroke="currentColor" stroke-width="2" fill="none"
                                                         stroke-linecap="round" stroke-linejoin="round"
                                                         className="w-6 h-6" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="1"/>
                                                        <circle cx="19" cy="12" r="1"/>
                                                        <circle cx="5" cy="12" r="1"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="flex mb-8">
                                                <div
                                                    className="w-4 h-4 flex-shrink-0 rounded-full border-indigo-400 border-2 mt-1 mr-2"></div>
                                                <div className="flex-grow">
                                                    <h3 className="text-sm mb-1">Tumeric slow-carb polaroid pork</h3>
                                                    <h4 className="text-xs text-indigo-300 italic">21 min ago</h4>
                                                </div>
                                                <button className="text-indigo-300 flex-shrink-0 ml-2">
                                                    <svg stroke="currentColor" stroke-width="2" fill="none"
                                                         stroke-linecap="round" stroke-linejoin="round"
                                                         className="w-6 h-6" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="1"/>
                                                        <circle cx="19" cy="12" r="1"/>
                                                        <circle cx="5" cy="12" r="1"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="flex mb-8">
                                                <div
                                                    className="w-4 h-4 flex-shrink-0 rounded-full border-indigo-400 border-2 mt-1 mr-2"></div>
                                                <div className="flex-grow">
                                                    <h3 className="text-sm mb-1">Actually tbh godard try-hard jianbing
                                                        vape</h3>
                                                    <h4 className="text-xs text-indigo-300 italic">24 min ago</h4>
                                                </div>
                                                <button className="text-indigo-300 flex-shrink-0 ml-2">
                                                    <svg stroke="currentColor" stroke-width="2" fill="none"
                                                         stroke-linecap="round" stroke-linejoin="round"
                                                         className="w-6 h-6" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="1"/>
                                                        <circle cx="19" cy="12" r="1"/>
                                                        <circle cx="5" cy="12" r="1"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="flex mb-8">
                                                <div
                                                    className="w-4 h-4 flex-shrink-0 rounded-full border-indigo-400 border-2 mt-1 mr-2"></div>
                                                <div className="flex-grow">
                                                    <h3 className="text-sm mb-1">Forage hell of knausgaard distillery
                                                        everyday</h3>
                                                    <h4 className="text-xs text-indigo-300 italic">38 min ago</h4>
                                                </div>
                                                <button className="text-indigo-300 flex-shrink-0 ml-2">
                                                    <svg stroke="currentColor" stroke-width="2" fill="none"
                                                         stroke-linecap="round" stroke-linejoin="round"
                                                         className="w-6 h-6" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="1"/>
                                                        <circle cx="19" cy="12" r="1"/>
                                                        <circle cx="5" cy="12" r="1"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="flex mb-8">
                                                <div
                                                    className="w-4 h-4 flex-shrink-0 rounded-full border-indigo-400 border-2 mt-1 mr-2"></div>
                                                <div className="flex-grow">
                                                    <h3 className="text-sm mb-1">DIY copper mug thundercats
                                                        literally</h3>
                                                    <h4 className="text-xs text-indigo-300 italic">38 min ago</h4>
                                                </div>
                                                <button className="text-indigo-300 flex-shrink-0 ml-2">
                                                    <svg stroke="currentColor" stroke-width="2" fill="none"
                                                         stroke-linecap="round" stroke-linejoin="round"
                                                         className="w-6 h-6" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="1"/>
                                                        <circle cx="19" cy="12" r="1"/>
                                                        <circle cx="5" cy="12" r="1"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="flex mb-8">
                                                <div
                                                    className="w-4 h-4 flex-shrink-0 rounded-full border-indigo-400 border-2 mt-1 mr-2"></div>
                                                <div className="flex-grow">
                                                    <h3 className="text-sm mb-1">Cronut distillery selfies, hella shabby
                                                        chic</h3>
                                                    <h4 className="text-xs text-indigo-300 italic">10 min ago</h4>
                                                </div>
                                                <button className="text-indigo-300 flex-shrink-0 ml-2">
                                                    <svg stroke="currentColor" stroke-width="2" fill="none"
                                                         stroke-linecap="round" stroke-linejoin="round"
                                                         className="w-6 h-6" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="1"/>
                                                        <circle cx="19" cy="12" r="1"/>
                                                        <circle cx="5" cy="12" r="1"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="flex mb-8">
                                                <div
                                                    className="w-4 h-4 flex-shrink-0 rounded-full border-indigo-400 border-2 mt-1 mr-2"></div>
                                                <div className="flex-grow">
                                                    <h3 className="text-sm mb-1">Tumeric slow-carb polaroid pork</h3>
                                                    <h4 className="text-xs text-indigo-300 italic">21 min ago</h4>
                                                </div>
                                                <button className="text-indigo-300 flex-shrink-0 ml-2">
                                                    <svg stroke="currentColor" stroke-width="2" fill="none"
                                                         stroke-linecap="round" stroke-linejoin="round"
                                                         className="w-6 h-6" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="1"/>
                                                        <circle cx="19" cy="12" r="1"/>
                                                        <circle cx="5" cy="12" r="1"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="flex mb-8">
                                                <div
                                                    className="w-4 h-4 flex-shrink-0 rounded-full border-indigo-400 border-2 mt-1 mr-2"></div>
                                                <div className="flex-grow">
                                                    <h3 className="text-sm mb-1">Actually tbh godard try-hard jianbing
                                                        vape</h3>
                                                    <h4 className="text-xs text-indigo-300 italic">24 min ago</h4>
                                                </div>
                                                <button className="text-indigo-300 flex-shrink-0 ml-2">
                                                    <svg stroke="currentColor" stroke-width="2" fill="none"
                                                         stroke-linecap="round" stroke-linejoin="round"
                                                         className="w-6 h-6" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="1"/>
                                                        <circle cx="19" cy="12" r="1"/>
                                                        <circle cx="5" cy="12" r="1"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="flex mb-8">
                                                <div
                                                    className="w-4 h-4 flex-shrink-0 rounded-full border-indigo-400 border-2 mt-1 mr-2"></div>
                                                <div className="flex-grow">
                                                    <h3 className="text-sm mb-1">Forage hell of knausgaard distillery
                                                        everyday</h3>
                                                    <h4 className="text-xs text-indigo-300 italic">38 min ago</h4>
                                                </div>
                                                <button className="text-indigo-300 flex-shrink-0 ml-2">
                                                    <svg stroke="currentColor" stroke-width="2" fill="none"
                                                         stroke-linecap="round" stroke-linejoin="round"
                                                         className="w-6 h-6" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="1"/>
                                                        <circle cx="19" cy="12" r="1"/>
                                                        <circle cx="5" cy="12" r="1"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="flex">
                                                <div
                                                    className="w-4 h-4 flex-shrink-0 rounded-full border-indigo-400 border-2 mt-1 mr-2"></div>
                                                <div className="flex-grow">
                                                    <h3 className="text-sm mb-1">DIY copper mug thundercats
                                                        literally</h3>
                                                    <h4 className="text-xs text-indigo-300 italic">38 min ago</h4>
                                                </div>
                                                <button className="text-indigo-300 flex-shrink-0 ml-2">
                                                    <svg stroke="currentColor" stroke-width="2" fill="none"
                                                         stroke-linecap="round" stroke-linejoin="round"
                                                         className="w-6 h-6" viewBox="0 0 24 24">
                                                        <circle cx="12" cy="12" r="1"/>
                                                        <circle cx="19" cy="12" r="1"/>
                                                        <circle cx="5" cy="12" r="1"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="fixed h-screen right-0 top-0 items-center flex">
                            <div
                                className="p-2 bg-white border-l-4 border-t-4 border-b-4 border-indigo-400 inline-flex items-center rounded-tl-lg shadow-2xl rounded-bl-lg z-10 flex-col">
                                <button
                                    className="bg-gray-500 w-5 h-5 rounded-full mb-2 outline-none focus:outline-none"
                                    theme-button="gray"></button>
                                <button className="bg-red-500 w-5 h-5 rounded-full mb-2 outline-none focus:outline-none"
                                        theme-button="red"></button>
                                <button
                                    className="bg-orange-500 w-5 h-5 rounded-full mb-2 outline-none focus:outline-none"
                                    theme-button="orange"></button>
                                <button
                                    className="bg-green-500 w-5 h-5 rounded-full mb-2 outline-none focus:outline-none"
                                    theme-button="green"></button>
                                <button
                                    className="bg-teal-500 w-5 h-5 rounded-full mb-2 outline-none focus:outline-none"
                                    theme-button="teal"></button>
                                <button
                                    className="bg-blue-500 w-5 h-5 rounded-full mb-2 outline-none focus:outline-none"
                                    theme-button="blue"></button>
                                <button
                                    className="bg-indigo-500 w-5 h-5 rounded-full mb-2 outline-none focus:outline-none"
                                    theme-button="indigo"></button>
                                <button
                                    className="bg-purple-500 w-5 h-5 rounded-full mb-2 outline-none focus:outline-none"
                                    theme-button="purple"></button>
                                <button className="bg-pink-500 w-5 h-5 rounded-full outline-none focus:outline-none"
                                        theme-button="pink"></button>
                            </div>
                        </div>

                        {/*<div className="flex p-4 text-sm text-black bg-[#F3F4F6]">*/}
                        {/*    <div>*/}
                        {/*        <span className="font-medium">Нэр: </span>*/}
                        {/*        {lastName}. {location.state.userinfo.firstName}*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateRate;
