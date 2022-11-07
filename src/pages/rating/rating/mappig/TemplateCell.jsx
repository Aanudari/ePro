import React, {useState} from "react";
import CategoryCell from "./CategoryCell";
import axios from "axios";
import {useStateContext} from "../../../../contexts/ContextProvider";
import {useNavigate} from "react-router-dom";
import CreateTemplate from "../CreateTemplate";
import AddCategory from "../AddCategory";

function TemplateCell (template){
    const vocData = {
        voc1: { title: "Add category"},
    };
    const [vocToShow, setVocToShow] = useState(null);
    const showModal = (voc) => setVocToShow(voc);
    const hideModal = () => setVocToShow(null);
    const tempID = (template.template && template.template.id);
    const navigate = useNavigate();
    const {TOKEN} = useStateContext();


    const deleteTemplate = () => {
        axios({
            method: "delete",
            headers: {
                "Authorization": `${TOKEN}`,
                "accept": "text/plain",
            },
            url: `http://192.168.10.248:9000/v1/RatingTemplate/${tempID}`,
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
        <div className="bg-gray-200 p-2 mt-2">
            <h5 className="text-black">{template.template && template.template.name}</h5>
            <button onClick={() => deleteTemplate()} className="btn btn-danger btn-sm">Delete template</button>
            <div>
                {vocToShow && (
                    <AddCategory template_id={template.template.id} show={vocToShow} voc={vocToShow} onClose={hideModal}  />
                )}
                <ul className="p-3">
                    {Object.keys(vocData).map((voc, key) => {
                        // console.log(vocData[voc]);
                        return (
                                <button onClick={() => showModal(vocData[voc])}
                                className="btn btn-warning btn-sm">
                                    {vocData[voc].title}
                                </button>
                        );
                    })}
                </ul>
            </div>
            <div className='w-5/6 p-3 bg-gray-100' >
                {
                    template.template ? template.template.categories.map((data, index) =>
                        <CategoryCell key={index} category={data}/>
                    ) : null
                }
            </div>
        </div>
)
}

export default TemplateCell;
