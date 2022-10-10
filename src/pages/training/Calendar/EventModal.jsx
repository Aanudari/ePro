import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../../contexts/GlobalContext";
import axios from "axios";

const labelsClasses = [
    "indigo",
    "gray",
    "green",
    "blue",
    "red",
    "purple",
];


export default function EventModal() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const checkList = ["Level-1", "Complain", "Telesales", "Online", "Branch", "Installer", "Care", "Bank"];
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setSelectedFile(true);
    };
    const {
        setShowEventModal,
        daySelected,
        dispatchCalEvent,
        selectedEvent,
    } = useContext(GlobalContext);

    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : ""
    );
    const [description, setDescription] = useState(
        selectedEvent ? selectedEvent.description : ""
    );
    const [teacherName, setTeacherName] = useState(
        selectedEvent ? selectedEvent.teacherName : ""
    );
    const [startTime, setStartTime] = useState(
        selectedEvent ? selectedEvent.startTime : ""
    );
    const [duration, setDuration] = useState(
        selectedEvent ? selectedEvent.duration : ""
    );
    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent
            ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
            : labelsClasses[0]
    );

    function handleSubmit(e) {
        e.preventDefault();
        const calendarEvent = {
            title,
            description,
            teacherName,
            startTime,
            duration,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),
        };
        if (selectedEvent) {
            dispatchCalEvent({ type: "update", payload: calendarEvent });
        } else {
            dispatchCalEvent({ type: "push", payload: calendarEvent });
        }

        setShowEventModal(false);
    }
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
            url: `${process.env.REACT_APP_URL}/api/User`,
        })
            .then(
                res => {
                    setData(res.data.result)
                }
            )
            .catch(err => console.log(err))
    }, [])
    const [data, setData] = useState();
    let levelOne = data && data.filter(e => (
        e.role === '1'
    ))
    const [isShown, setIsShown] = useState(false);
    return (
        <div style={{ background: "rgba(0,0,0,0.3)" }} className="h-full w-full absolute left-0 top-0 overflow-hidden">
            {
                showUserMenu && <div className="w-[250px] h-full top-0 left-[450px] bg-gray-100 absolute expanded-menu-x">
                    <header className="bg-gray-100 px-4 py-2 flex justify-between items-center h-14">
                        <span className="material-icons-outlined text-gray-400">
                        </span>
                        <div>
                        </div>
                    </header>
                    <div className="">
                        {checkList.map((item, index) => (
                            <div onMouseEnter={() => setIsShown(true)}
                                onMouseLeave={() => setIsShown(false)} key={index} className='px-3 py-2 bg-gray-100 hover:bg-gray-400 hover:text-white'>
                                <span className="ml-2">{item}</span>
                                {
                                    isShown && index == 0 ? <div className="w-[250px] h-full absolute bg-gray-200 px-3 py-2 left-[250px] top-0">
                                        1
                                        {/* {
                                            levelOne.map((user, index) => (
                                                <div key={index} className="h-12">{user}</div>
                                            ))
                                        } */}
                                    </div> : null
                                }
                            </div>
                        ))}
                    </div>
                </div>
            }

            <form className="bg-white h-full expanded-menu absolute w-[450px] shadow-sm flex flex-col justify-between z-100">
                <div>
                    <header className="bg-gray-100 px-4 py-2 flex justify-between items-center h-14">
                        <span className="material-icons-outlined text-gray-400">
                        </span>
                        <div>
                            {selectedEvent && (
                                <i onClick={() => {
                                    dispatchCalEvent({
                                        type: "delete",
                                        payload: selectedEvent,
                                    });
                                    setShowEventModal(false);
                                }} className="bi bi-trash-fill text-gray-500 cursor-pointer"></i>

                            )}
                            <button onClick={() => setShowEventModal(false)}>
                                <i className="bi bi-x-lg text-gray-500 ml-3 hover:scale-105"></i>
                            </button>
                        </div>
                    </header>
                    <div className="p-3">
                        <div className="flex flex-col">
                            <div className="flex justify-between">

                                <i className="bi bi-calendar-week"></i>
                                <p>{daySelected.format("dddd, MMMM DD")}</p>
                            </div>
                            <div className="flex items-center">
                                <i className="bi bi-list-nested"></i>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Сулгалтын нэр ..."
                                    value={title}
                                    required
                                    id="border"
                                    className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center mt-2">
                                <i className="bi bi-bookmark"></i>
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="Тайлбар ..."
                                    value={description}
                                    required
                                    id="border2"
                                    className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center mt-2">
                                <i className="bi bi-bookmark"></i>
                                <input
                                    type="text"
                                    name="teacherName"
                                    placeholder="Багшийн нэр ..."
                                    value={teacherName}
                                    required
                                    id="border2"
                                    className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                                    onChange={(e) => setTeacherName(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center mt-2">
                                <i className="bi bi-bookmark"></i>
                                <input
                                    type="text"
                                    name="teacherName"
                                    placeholder="Эхлэх цаг..."
                                    value={startTime}
                                    required
                                    id="border2"
                                    className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center mt-2">
                                <i className="bi bi-bookmark"></i>
                                <input
                                    type="text"
                                    name="teacherName"
                                    placeholder="Үргэлжлэх хугацаа..."
                                    value={duration}
                                    required
                                    id="border2"
                                    className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                                    onChange={(e) => setDuration(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center mt-4">
                                <i className="bi bi-upload"></i>
                                <span className="ml-2">File хавсаргах</span>
                            </div>
                            <input type="file" name="file" className="ml-4 mt-2" onChange={changeHandler} />
                        </div>
                    </div>
                </div>

                <footer className="flex justify-around border-t h-14 py-2 items-center">
                    <div className="flex gap-x-2">
                        {labelsClasses.map((lblClass, i) => (
                            <span
                                key={i}
                                onClick={() => setSelectedLabel(lblClass)}
                                className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                            >
                                {selectedLabel === lblClass && (
                                    <i className="bi bi-check-lg"></i>
                                )}
                            </span>
                        ))}
                    </div>
                    <button
                        // type="submit"
                        // onClick={handleSubmit}
                        onClick={(e) => {
                            e.preventDefault()
                            setShowUserMenu(!showUserMenu)
                        }}
                        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                    >
                        Мэдэгдэл илгээх
                    </button>
                </footer>
            </form>
        </div>
    );
}
