import React, { useState} from "react";

function Extras(data) {
    const [extraID, setextraID] = useState("");
    const [extraval, setextraval] = useState("");

    const val = {
        id: extraID === "" ? data.data.id : extraID,
        value: extraval
    }
    const handleVal = () => {
        data.setextraValues(val)
    }

    return (
        <div className="grid gap-6 mb-6 md:grid-cols-2">
            <input type="hidden"
                   name="id"
                   onChange={(e) => {
                       setextraID(e.target.value);
                       handleVal(e);
                   }}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   required=""/>
            <label>{data.data.name}</label>
            <input type="text"
                   id="value"
                   onChange={(e) => {
                       setextraval(e.target.value || "");
                       handleVal(e);
                   }}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   required=""/>

        </div>

    )
}

export default Extras;
