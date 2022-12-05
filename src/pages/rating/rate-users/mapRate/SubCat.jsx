import React, { useState} from "react";

function SubCat(data) {
    const [subcategoryID, setsubcategoryID] = useState("");
    const [subPoints, setsubPoints] = useState("");
    const sub = {
        id: subcategoryID === "" ? data.data.id : subcategoryID,
        points: subPoints
    }

    const handleVal = () => {
         data.setsubcatValues(sub)
    }

    return (
        <div className="w-full h-full">
            <div className="md:flex md:items-center mb-3 ml-10 mr-10">
                <div className="md:w-full">
                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4 ml-4">
                        {data.data.name}
                    </label>
                </div>

                <div className="md:w-1/3">
                    <input type="hidden"
                         name="id"  onChange={(e) => {
                        setsubcategoryID(e.target.value);
                        handleVal();
                    }}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required=""/>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        type="number" placeholder="%" required=""
                        name="points"
                        onChange={(e) => {
                            setsubPoints(e.target.value);
                            handleVal();
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default SubCat;
