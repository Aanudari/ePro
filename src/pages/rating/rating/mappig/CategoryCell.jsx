import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../../../../contexts/ContextProvider";
import axios from "axios";
import SubCategoryCell from "../mappig/SubCategoryCell";
import AddCategory from "../AddCategory";
import EditCategory from "../EditCategory";


function CategoryCell(category) {
    const vocData = {
        voc1: {title: "Edit category"},
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
            url: `${process.env.REACT_APP_URL}/v1/Category/cat/${category.category.id}`,
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
        <div className="text-black flex flex-col">
            <div className="p-4 flex items-center border border-gray-600">
                <div className="mr-auto">
                    <h1 className="text-xl leading-none mb-1">Category name: {category.category && category.category.name}</h1>
                    <h2 className="text-sm">Category maxpoints: {category.category && category.category.maxPoints}%</h2>
                </div>
                <button onClick={() => deleteCategory()}
                        className="inline-block px-2 py-2 border-2 font-medium text-sm leading-tight uppercase rounded transition duration-150 ease-in-out">
                    <i className="bi bi-trash"/> Delete category
                </button>
                {vocToShow && (
                    <EditCategory category={category} show={vocToShow} voc={vocToShow} onClose={hideModal}/>
                )}
                {Object.keys(vocData).map((voc, key) => {
                    // console.log(vocData[voc]);
                    return (
                        <button onClick={() => showModal(vocData[voc])}
                                className="ml-2 inline-block px-2 py-2 border-2 font-medium text-sm leading-tight uppercase rounded transition duration-150 ease-in-out">
                            <i className="bi bi-pencil"/> {vocData[voc].title}
                        </button>
                    );
                })}
            </div>
              <div className="border-gray-600 items-center">
                  {
                      category ? category.category.subCategory.map((data, index) =>
                          <SubCategoryCell key={index} subcategory={data}/>
                      ) : null
                  }
              </div>
        </div>
    )
}
export default CategoryCell;
