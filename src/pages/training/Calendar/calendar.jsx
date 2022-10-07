import React, { useState, useContext, useEffect } from "react";
import { getMonth } from "./util";
import CalendarHeader from "./CalendarHeader";
import Month from "./Month";
import GlobalContext from "../../../contexts/GlobalContext";
import EventModal from "./EventModal";
import Navigation from "../../../components/Navigation";
function CalendarX() {
    const [currenMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    return (
        <div className="w-full">
            <Navigation />
            <div className="h-[calc(100%+192px)] relative flex flex-col oveflow-hidden">
                {showEventModal && <EventModal />}
                <CalendarHeader />
                <div className="flex flex-1 ">
                    {/* <Sidebar /> */}
                    <Month month={currenMonth} />
                </div>
            </div>
        </div>
    );
}

export default CalendarX;
