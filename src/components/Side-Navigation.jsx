import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "bootstrap-icons/font/bootstrap-icons.css";
function SideNavigation() {
    const { user } = useStateContext();
    const navigate = useNavigate();
    const { roleId } = useStateContext();
    let location = useLocation();
    let path = location.pathname
    return (
        <div className="w-[345px] h-full shadow-cus content relative ">
            <div className="h-full w-[280px] fixed pl-4 pt-4 pr-4 md:overflow-hidden overflow-auto md:hover:overflow-auto cus-index">
                <div className="w-full flex justify-start mb-3">

                    <img onClick={() => { navigate("/home"); }} alt="ДДЭШТВ ХХК" className="w-[120px] ml-1 hover:scale-105 transition" src="./ddish_logo.png" />
                </div>
                <div>
                    <h5 className="text-[16px] mt-6 h-6 uppercase text-gray-500 mt-2">Шалгалт</h5>
                    {
                        roleId === "199" ?
                            <div onClick={() => { navigate("/exam-form"); }} className={path == "/exam-form" ?
                                "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
                                "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "}>
                                <i className="bi bi-book"></i>
                                <span className="ml-1 font-[400]">  Шалгалтын форм үүсгэх</span>
                            </div> : null
                    }

                    <div
                        onClick={() => {
                            navigate("/take-exam");
                        }}
                        className={
                            path == "/take-exam" ?
                                "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
                                "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
                        }
                    >
                        <i className="bi bi-bookmark-check"></i>
                        <span className="ml-1 font-[400]">Шалгалт өгөх</span>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/exam-result");
                        }}
                        className={
                            path == "/exam-result" ?
                                "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
                                "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
                        }
                    >
                        <i className="bi bi-bookmark-star"></i>
                        <span className="ml-1 font-[400]">Шалгалтын дүн харах</span>
                    </div>
                </div>


                <div>
                    <h5 className="text-[16px] mt-6 h-6 uppercase text-gray-500 mt-2">Үнэлгээ</h5>
                    <div
                        onClick={() => {
                            navigate("/dashboard");
                        }}
                        className={
                            path == "/dashboard" ?
                                "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
                                "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
                        }
                    >
                        <i className="bi bi-card-checklist"></i>
                        <span className="ml-1 font-[400]">Хянах самбар</span>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/level-one");
                        }}
                        className={
                            path == "/level-one" ?
                                "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
                                "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
                        }
                    >
                        <i className="bi bi-1-square"></i>
                        <span className="ml-1 font-[400]">LEVEL 1</span>
                    </div>
                    {/* HERE */}
                    <div
                        onClick={() => {
                            navigate("/complain");
                        }}
                        className={
                            path == "/complain" ?
                                "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
                                "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
                        }
                    >
                        <i className="bi bi-bag"></i>
                        <span className="ml-1 font-[400]">COMPLAIN</span>
                    </div>
                    {/* HERE */}
                    <div
                        onClick={() => {
                            navigate("/telesales");
                        }}
                        className={
                            path == "/telesales" ?
                                "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
                                "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
                        }
                    >
                        <i className="bi bi-bag"></i>
                        <span className="ml-1 font-[400]">TELESALES</span>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/online");
                        }}
                        className={
                            path == "/online" ?
                                "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
                                "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
                        }
                    >
                        <i className="bi bi-bag"></i>
                        <span className="ml-1 font-[400]">ONLINE</span>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/branch");
                        }}
                        className={
                            path == "/branch" ?
                                "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
                                "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
                        }
                    >
                        <i className="bi bi-bag"></i>
                        <span className="ml-1 font-[400]">BRANCH</span>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/installer");
                        }}
                        className={
                            path == "/installer" ?
                                "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
                                "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
                        }
                    >
                        <i className="bi bi-bag"></i>
                        <span className="ml-1 font-[400]">INSTALLER</span>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/care");
                        }}
                        className={
                            path == "/care" ?
                                "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
                                "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
                        }
                    >
                        <i className="bi bi-bag"></i>
                        <span className="ml-1 font-[400]">CARE</span>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/bank");
                        }}
                        className={
                            path == "/bank" ?
                                "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
                                "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
                        }
                    >
                        <i className="bi bi-bank"></i>
                        <span className="ml-1 font-[400]">BANK</span>
                    </div>
                </div>


                <div>
                    <h5 className="text-[16px] mt-6 h-6 uppercase text-gray-500 mt-2">Сургалт</h5>
                    <div
                        onClick={() => {
                            navigate("/create-training");
                        }}
                        className={
                            path == "/create-training" ?
                                "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
                                "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
                        }
                    >
                        <i className="bi bi-folder2-open"></i>
                        <span className="ml-1 font-[400]">Сургалт төлөвлөх</span>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/took-training");
                        }}
                        className={
                            path == "/took-training" ?
                                "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
                                "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
                        }
                    >
                        <i className="bi bi-hand-thumbs-up"></i>
                        <span className="ml-1 font-[400]">Сургалтан хамрагдсан</span>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/trainings");
                        }}
                        className={
                            path == "/trainings" ?
                                "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
                                "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
                        }
                    >
                        <i className="bi bi-card-list"></i>
                        <span className="ml-1 font-[400]">Сургалтууд</span>
                    </div>
                </div>

                <div className="card border-primary mb-3 mt-2">
                    <div className="card-body text-primary">
                        <h6 className="card-title">© 2022 DDISHTV LLC</h6>
                        <p className="card-text">Build 0.1</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideNavigation;
