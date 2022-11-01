import React, {useEffect, useState} from 'react';
import SubCategoryCell from "./subCategory/SubCategoryCell";
import {useStateContext} from "../../../contexts/ContextProvider";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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
                        navigate(0);
                    }
                )
                .catch(err => console.log(err))
    }
    return (
        <div>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <h6> {category && category.category.name} ({category && category.category.maxPoints}%) {category && category.category.id}</h6>
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


    );
}

export default CategoryCell;
