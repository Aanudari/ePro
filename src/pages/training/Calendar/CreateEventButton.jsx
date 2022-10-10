import React, { useContext } from "react";
import GlobalContext from "../../../contexts/GlobalContext";
export default function CreateEventButton() {
    const { setShowEventModal } = useContext(GlobalContext);
    return (
        <button
            onClick={() => setShowEventModal(true)}
            className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
        >
            <img src={'avatar2.png'} alt="create_event" className="w-7 h-7" />
            <span className="pl-3 pr-7"> Create</span>
        </button>
    );
}
