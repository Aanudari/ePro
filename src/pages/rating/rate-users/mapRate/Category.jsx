import React, { useState} from "react";
import SubCat from "./SubCat";

function Category(data) {
    const [categoryID, setcategoryID] = useState("");
    const [subcatValues, setsubcatValues] = useState();
    const categorytotal = 100;

    const cat = {
        id: categoryID === "" ? data.data.id : categoryID,
        points: categorytotal,
        subCategory: subcatValues
    }
    const handleVal = () => {
        data.setcatValues(cat)
    }

    // console.log(subcatValues)
    return (
        <div className="bg-white rounded shadow-sm p-4 px-4 md:p-8 mb-6">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">
                        {data.data.name}
                    </h6>
                    <input type="hidden"
                           name="id"
                           onChange={(e) => {
                               setcategoryID(e.target.value);
                               handleVal();
                           }}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required=""/>
                </div>
                {
                    data.data ? data.data.subCategory.map((data, index) =>
                        <SubCat key={index} data={data} subcatValues={subcatValues} setsubcatValues={setsubcatValues}/>
                    ) : null
                }
            </div>
        </div>

    )
}

export default Category;
