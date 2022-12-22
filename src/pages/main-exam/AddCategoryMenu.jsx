import { useStateContext } from "../../contexts/ContextProvider";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DepartmentSelect from "../exam/ExamForm/DepartmentSelect";

function AddCategoryMenu({ showAddCategory, setShowAddCategory }) {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
        window.location.reload();
    };
    const { TOKEN } = useStateContext();
    const { activeMenu } = useStateContext();
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [data, setData] = useState();
    let arr = {
        "name": `${name}`,
        "startDate": null,
        "endDate": null,
        "department": `${department}`
    }
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${TOKEN}`
            },
            url: "http://192.168.10.248:9000/v1/User/department",
        })
            .then(
                res => {
                    if (res.data.errorCode == 401) {
                        logout()
                    } else {
                        setData(res.data.departments)
                    }
                }
            )
            .catch(err => console.log(err))
    }, [])
    const handleOptions = (value) => {
        setDepartment(value)
    }
    const submitCategory = () => {
        axios({
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": TOKEN
            },
            url: `${process.env.REACT_APP_URL}/v1/Pool/add/Category`,
            data: arr,
        })
            .then((res) => {
                setShowAddCategory(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className={`fixed ${activeMenu ? "top-[56px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)]"
            : "w-full h-full top-[25px] left-0"
            } 
        bg-black bg-opacity-50 flex justify-center items-center
        `}>
            <div className="shrink w-[calc(85%)] h-[600px] bg-white flex flex-col ">
                <div className="w-full min-h-[50px] bg-gray-700 flex justify-between items-center px-3">
                    <h5 className="text-white m-0 text-[17px]">Категори нэмэх</h5>
                    <button onClick={() => {
                        setShowAddCategory(false)
                    }}
                        className="w-[20px] h-full ">
                        <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
                    </button>
                </div>
                <div className="h-full w-full px-3 pt-10 overflow-scroll flex justify-center items-center mb-20">
                    <div className="w-1/2 h-1/2">
                        <div className="group w-full">
                            <input
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                className={'custom-validation !w-full !border-b-[2px] !border-[#50a3a2] font-[400]'}
                                type="text" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label className=''>Категори нэр</label>
                        </div>
                        <DepartmentSelect data={data} handleOptions={handleOptions} />

                    </div>
                </div>
                {
                    name !== "" && department !== undefined &&
                    <div onClick={submitCategory} className="h-20 bg-gray-700 flex justify-center 
                    cursor-pointer hover:bg-gray-600 items-center text-white font-[500]">Категори үүсгэх</div>
                }
            </div>
        </div>
    );
}

export default AddCategoryMenu;