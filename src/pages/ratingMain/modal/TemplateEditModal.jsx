import { useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SubCategory from "./SubCategory";
import EditSubCategory from "./EditSubCategory";

function TemplateEditModal({ setShowModal, trigger, setTrigger }) {
    const { activeMenu, templateID, TOKEN } = useStateContext()
    const [addCategory, setaddCategory] = useState();
    const [ids, setIds] = useState([]);
    const [datas, setDatas] = useState();
    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
        window.location.reload();
    };
    const navigate = useNavigate();
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                Authorization: `${TOKEN}`,
            },
            url: `${process.env.REACT_APP_URL}/v1/RatingTemplate/template/${templateID}`,
        })
            .then((res) => {
                if (res.data.resultMessage === "Unauthorized") {
                    logout();
                } else {
                    setDatas(res.data.result)
                }
            })
            .catch((err) => console.log(err));
    }, [addCategory, ids])
    const [catName, setCatName] = useState('');
    const [catPoint, setCatPoint] = useState('');
    let main = {
        "name": `${catName}`,
        "maxPoints": `${catPoint}`,
        "subCategories": [],
        "templateId": templateID
    }
    const submitCategory = () => {
        axios({
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": TOKEN
            },
            url: `${process.env.REACT_APP_URL}/v1/Category/cat`,
            data: main,
        })
            .then((res) => {
                setaddCategory(false)
                setTrigger(!trigger)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleCollector = (value) => {
        if (ids.includes(value)) {
            setIds([])
        } else {
            setIds([value])
        }
    }
    const deleteCategory = (value) => {
        axios({
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": TOKEN
            },
            url: `${process.env.REACT_APP_URL}/v1/Category/cat/${value}`,
        })
            .then((res) => {
                setIds([])
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const deleteTemplate = (value) => {
        axios({
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": TOKEN
            },
            url: `${process.env.REACT_APP_URL}/v1/RatingTemplate/${value}`,
        })
            .then((res) => {
                setTrigger(!trigger)
                setShowModal(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className={`${activeMenu ? " left-[250px] w-[calc(100%-250px)]" : "left-0 w-full"} 
        top-[56px] fixed  h-[calc(100%-56px)] 
        bg-black bg-opacity-50 flex items-center justify-center`}>
            {
                !addCategory ?
                    <div className="bg-white appear-smooth w-10/12 h-[calc(80%)] rounded ">
                        <div className="w-full h-12 bg-teal-500 rounded-t flex justify-between px-4 items-center">
                            <div className="flex items-center">
                                <i onClick={() => {
                                    setaddCategory(!addCategory)
                                }} className="bi bi-plus-circle text-xl text-white cursor-pointer"></i>
                                <div className=" flex justify-start px-4 py-2">
                                    <span className="text-white font-[500] text-sm">{datas?.name}</span>
                                </div>
                            </div>
                            <div>
                            <i onClick={() => {
                                deleteTemplate(datas.id)
                            }} className="bi bi-trash3 text-xl cursor-pointer hover:scale-105 mr-5 "></i>
                            <i onClick={() => {
                                setShowModal(false)
                            }} className="bi bi-x-lg text-xl cursor-pointer hover:scale-105"></i>
                            </div>
                        </div>
                        <div className="h-[calc(100%-50px)] w-full px-3 pt-1 overflow-scroll pb-5">
                            <div className="mt-2 bg-teal-500">

                            </div>
                            <div className="w-full mt-1">
                                {
                                    datas?.categories.map((item, index) => (
                                        <div className="mt-2 bg-teal-500 rounded" key={index}>
                                            <div className=" flex justify-between px-4 py-2 relative">
                                                <div className="">
                                                    <i onClick={() => {
                                                        deleteCategory(item.id)
                                                    }} className="bi bi-trash3-fill text-white mr-2 text-sm"></i>
                                                    <span className="text-white font-[500] text-sm">Нэр: {item.name}</span>
                                                </div>
                                                <div className="flex">
                                                    <i onClick={() => {
                                                        handleCollector(item.id)
                                                    }} className="bi bi-plus-circle text-white ml-2 absolute right-[100px] top-[5px]
                                                cursor-pointer"></i>
                                                    <span className="text-white font-[500] text-sm">{item.maxPoints}<i className="bi bi-percent"></i></span>
                                                </div>
                                            </div>
                                            <div className="px-4 bg-white border-l border-teal-500 border-r">
                                                {
                                                    item?.subCategory.map((it, i) => (
                                                        <SubCategory key={i} it={it} setIds={setIds} mainId={item.id} ids={ids} />
                                                    ))
                                                }
                                                <EditSubCategory setIds={setIds} id={ids} mainId={item.id} />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div className="bg-white appear-smooth w-10/12 h-[calc(70%)] rounded-t">
                        <div className="w-full h-12 bg-teal-500 rounded-t flex justify-between px-4 items-center">
                            <i onClick={() => {
                                setaddCategory(!addCategory)
                            }} className="bi bi-plus-circle text-xl text-white cursor-pointer"></i>
                            <i onClick={() => {
                                setShowModal(false)
                            }} className="bi bi-x-lg text-xl cursor-pointer hover:scale-105"></i>
                        </div>
                        <div className="h-[calc(100%-50px)] w-full px-3 pt-1 overflow-scroll px-4 pt-20">

                            <div className="group pr-4 w-1/2 mt-10 mx-5">
                                <input onChange={(e) => {
                                    setCatName(e.target.value)
                                }} className='!w-full !text-[14px] font-[400]'
                                    type="text" required />
                                <span className="highlight"></span>
                                <span className="bar "></span>
                                <label className="">Category нэр</label>
                            </div>
                            <div className="group pr-4 w-1/2 mx-5">
                                <input onChange={(e) => {
                                    setCatPoint(e.target.value)
                                }} className='!w-full !text-[14px] font-[400]'
                                    type="number" required />
                                <span className="highlight"></span>
                                <span className="bar "></span>
                                <label className="">Оноо</label>

                            </div>
                        </div>
                        <div onClick={submitCategory} className="bg-teal-500 w-full h-12 flex justify-center items-center font-[400]
                        text-white cursor-pointer hover:bg-teal-600 active:bg-teal-400">Үүсгэх</div>
                    </div>
            }
        </div>
    );
}

export default TemplateEditModal;