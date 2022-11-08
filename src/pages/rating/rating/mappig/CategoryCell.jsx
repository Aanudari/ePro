import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../../../../contexts/ContextProvider";
import axios from "axios";
import SubCategoryCell from "../mappig/SubCategoryCell";
import AddCategory from "../AddCategory";
import EditCategory from "../EditCategory";


function CategoryCell(category) {
    const vocData = {
        voc1: { title: "Edit category"},
    };
    const [vocToShow, setVocToShow] = useState(null);
    const showModal = (voc) => setVocToShow(voc);
    const hideModal = () => setVocToShow(null);
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
                <h6>Category нэр: {category && category.category.name} ({category && category.category.maxPoints}%)</h6>
                <button onClick={() => deleteCategory()} className="btn btn-danger btn-sm">Delete category</button>
                <div className="mt-2">
                    {vocToShow && (
                        <EditCategory category={category} show={vocToShow} voc={vocToShow} onClose={hideModal}  />
                    )}
                        {Object.keys(vocData).map((voc, key) => {
                            // console.log(vocData[voc]);
                            return (
                                <button onClick={() => showModal(vocData[voc])}
                                        className="btn btn-warning btn-sm">
                                    {vocData[voc].title}
                                </button>
                            );
                        })}
                </div>
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
