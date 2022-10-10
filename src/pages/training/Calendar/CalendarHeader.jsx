import dayjs from "dayjs";
import React, { useContext } from "react";
import GlobalContext from "../../../contexts/GlobalContext";
export default function CalendarHeader() {
    const { monthIndex, setMonthIndex } = useContext(GlobalContext);
    function handlePrevMonth() {
        setMonthIndex(monthIndex - 1);
    }
    function handleNextMonth() {
        setMonthIndex(monthIndex + 1);
    }
    function handleReset() {
        setMonthIndex(
            monthIndex === dayjs().month()
                ? monthIndex + Math.random()
                : dayjs().month()
        );
    }
    return (
        <header className="px-4 py-2 flex items-center">
            <button
                onClick={handleReset}
                className="border active:bg-gray-200 rounded py-2 px-4 mr-5"
            >
                Өнөөдөр
            </button>
            <button onClick={handlePrevMonth} className={'active:bg-gray-300 rounded-full'}>
                <i className="py-2 px-1 bi bi-caret-left-fill"/>
            </button>
            <button onClick={handleNextMonth} className={'active:bg-gray-300 rounded-full ml-2'}>
                <i className="py-2 px-1 bi bi-caret-right-fill"/>
            </button>
            <h2 className="ml-4 text-xl text-gray-500 font-bold">
                {dayjs(new Date(dayjs().year(), monthIndex)).format(
                    "MMMM YYYY"
                )}
            </h2>
        </header>
    );
}
