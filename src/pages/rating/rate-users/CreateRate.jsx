import React, { useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
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
    const extras = location.state.template.extras;
    const category = location.state.template.categories;
    const ratingtotal = 100;
    const categorytotal = 90;
    const [extraID, setextraID] = useState("");
    const [extraval, setextraval] = useState("");
    const [subcategoryID, setsubcategoryID] = useState('');
    const [subPoints, setsubPoints] = useState('');
    const [categoryID, setcategoryID] = useState('')
    const [extraValue, setExtraValue] = useState({
        "id": `${extraID}`,
        "value": `${extraval}`
    });
    const [catValue, setCatValue] = useState([
        {
            "id": `${categoryID}`,
            "points": `${categorytotal}`,
            "subCategory": []
        }
    ]);
    const [subValue, setSubValue] = useState({
        "id": `${subcategoryID}`,
        "points": `${subPoints}`,
    });

    const create_rate_data = {
        "userId": `${location.state.userinfo.deviceId}`,
        "startDate": `${dateTime1}`,
        "endDate": `${dateTime2}`,
        "rating": `${ratingtotal}`,
        "categories": [],
        "extras": []
    }

    const onSub = (e) => {
        e.preventDefault();
        let arr = [];
        arr.push(subValue);
        setCatValue((prev) => ({ ...prev, subCategory: arr }))
    }

    return (
        <div className="w-full h-full min-h-screen bg-[#F3F4F6]">
            <Navigation/>
            <div className=" h-full">
                <div className="flex flex-wrap">
                    <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
                        <div
                            className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                                <div className="flex flex-wrap">
                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">Нэр:</h5>
                                        <span
                                            className="font-semibold text-sm text-blueGray-700">{lastName}. {location.state.userinfo.firstName}</span>
                                    </div>
                                    <div className="relative w-auto pl-4 flex-initial">
                                        <div
                                            className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-red-500">
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
                                        <span
                                            className="font-semibold text-sm text-blueGray-700">{location.state.userinfo.roleName}</span>
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
                        <div
                            className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
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
                            <div className="bg-white rounded shadow-sm p-4 px-4 md:p-8 mb-6 grid gap-6 mb-6 md:grid-cols-3 p-0">
                                {
                                    extras ? extras.map((data, index) =>
                                        <div key={index} className="grid gap-6 mb-6 md:grid-cols-2">
                                            <input type="hidden"
                                                   value={data.id}
                                                   onChange={(e) => {
                                                       setextraID(e.target.value);
                                                   }}
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   required=""/>
                                            <label>{data.name}</label>
                                            <input type="text"
                                                   onChange={(e) => {
                                                       setextraval(e.target.value);
                                                   }}
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   required=""/>
                                        </div>
                                    ) : null
                                }
                            </div>
                            <div className="bg-white rounded shadow-sm p-4 px-4 md:p-8 mb-6 grid gap-6 mb-6 p-0">
                                {
                                    category ? category.map((data, index) =>
                                        <div key={index} className="bg-white rounded shadow-sm p-4 px-4 md:p-8 mb-6">
                                            <div className="rounded-t bg-white mb-0 px-6 py-6">
                                                <div className="text-center flex justify-between">
                                                    <h6 className="text-blueGray-700 text-xl font-bold">
                                                        {data.name}
                                                    </h6>
                                                    <input type="hidden"
                                                           name="id"
                                                           value={data.id}
                                                           onChange={(e) => {
                                                               setcategoryID(e.target.value);
                                                           }}
                                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                           required=""/>
                                                </div>
                                                {
                                                    data ? data.subCategory.map((data, index) =>
                                                        <div className="w-full h-full">
                                                            <div className="md:flex md:items-center mb-3 ml-10 mr-10">
                                                                <div className="md:w-full">
                                                                    <label
                                                                        className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4 ml-4">
                                                                        {data.name}
                                                                    </label>
                                                                </div>

                                                                <div className="md:w-1/3">
                                                                    <input type="hidden"
                                                                           value={data.id}
                                                                           name="id" onChange={(e) => {
                                                                        setsubcategoryID(e.target.value);
                                                                    }}
                                                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                           required=""/>
                                                                    <input
                                                                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                                                        type="number" placeholder="%" required=""
                                                                        name="points"
                                                                        onChange={(e) => {
                                                                            setsubPoints(e.target.value);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : null
                                                }
                                            </div>
                                        </div>
                                    ) : null
                                }
                            </div>
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
        </div>
    )
}
export default CreateRate;
