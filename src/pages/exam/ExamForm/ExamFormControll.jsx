import { useEffect, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import TakeExamCellAdmin from "../../../components/sub-components/TakeExamCellAdmin";

function ExamFormControll({ setKeyX }) {
    const { TOKEN } = useStateContext();
    const [data, setData] = useState();
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState();
    const [trigger, setTrigger] = useState(false);
    const handleModal = (data) => {
        setShowModal(!showModal)
        setModalData(data)
    }
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${TOKEN}`
            },
            url: `${process.env.REACT_APP_URL}/v1/ExamNew`,
        })
            .then(
                res => {
                    setData(res.data.examList)
                }
            )
            .catch(err => console.log(err))
    }, [trigger])
    console.log(data)
    // console.log(modalData)
    const handleDeleteExam = (id) => {
        axios({
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${TOKEN}`
            },
            url: `${process.env.REACT_APP_URL}/v1/Exam/${id}`,
        })
            .then(
                res => {
                    setShowModal(false)
                    setTrigger(!trigger)
                }
            )
            .catch(err => console.log(err))
    }
    return (
        <div className="w-full relative flex flex-wrap gap-4 p-4 justify-center md:justify-start ">
            {
                data &&
                data.map((item, index) => (
                    <TakeExamCellAdmin handleModal={handleModal} data={item}
                        showModal={showModal} key={index} index={index}
                    />
                ))
            }
            {
                showModal &&
                <div className="fixed w-full h-screen top-0 left-0 bg-black 
                    bg-opacity-50 flex justify-center items-center">
                    <div className="w-5/6 md:w-1/3 h-1/2 bg-white md:rounded p-3 flex flex-col">
                        <div className="h-full">
                            <p>Нэр : {modalData.name}</p>
                            <p>id :{modalData.id}</p>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button onClick={() => {
                                setKeyX("1.1")
                                localStorage.setItem("exam_id", modalData.id)
                            }} className="px-3 py-2 border rounded">
                                Дэлгэрэнгүй
                            </button>
                            <button onClick={() => {
                                handleDeleteExam(modalData.id)
                            }} className="px-3 py-2 bg-red-400 text-white font-[500] rounded">Устгах</button>
                            <button
                                onClick={() => {
                                    setShowModal(false)
                                }}
                                className="px-3 py-2 bg-sky-400 text-white font-[500] rounded">
                                <i className="bi bi-x-lg font-bold"></i>
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>

    );
}

export default ExamFormControll;