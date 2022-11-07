import React from "react";
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../../../../contexts/ContextProvider";
import axios from "axios";
import SubCategoryCell from "../mappig/SubCategoryCell";


function CategoryCell(category) {

    const navigate = useNavigate();
    const {TOKEN} = useStateContext();
    const deleteCategory = () => {
        axios({
            method: "delete",
            headers: {
                "Authorization": `${TOKEN}`,
                "accept": "text/plain",
            },
            url: `http://192.168.10.248:9000/v1/Category/cat/${category.category.id}`,
        })
            .then(
                res => {
                    if (res.data.isSuccess === true) {
                        navigate(0);
                    } else {
                        console.log(res.data.resultMessage)
                    }
                }
            )
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <h6> {category && category.category.name} ({category && category.category.maxPoints}%)</h6>
                <button onClick={() => deleteCategory()} className="btn btn-danger btn-sm">Delete category</button>
                <div>
                    <h6>Үнэлгээг бүрдүүлэх ур чадварын жагсаалтууд</h6>
                    {
                        category ? category.category.subCategory.map((data, index) =>
                            <SubCategoryCell key={index} subcategory={data} />
                        ) : null
                    }
                </div>
            </div>
        </div>

    )
}

export default CategoryCell;
