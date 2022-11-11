import React, {useState} from "react";
import CategoryCell from "./CategoryCell";
import axios from "axios";
import {useStateContext} from "../../../../contexts/ContextProvider";
import {useNavigate} from "react-router-dom";
import CreateTemplate from "../CreateTemplate";
import AddCategory from "../AddCategory";

function TemplateCell (template) {
    const vocData = {
        voc1: {title: "Add category"},
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
            <div className="mt-2 text-white flex flex-col border rounded border-gray-600">
                <div className="p-4 bg-[#50A3A2] flex items-center">
                    <div className="mr-auto">
                        <h1 className="text-xl leading-none mb-1">Template нэр: {template.template && template.template.name}</h1>
                        <h2 className="text-sm">Харгалзах ажлын байр: {template.template && template.template.roleID}</h2>
                    </div>
                    <button onClick={() => deleteTemplate()}
                            className="inline-block px-2 py-2 border-2 font-medium text-sm leading-tight uppercase rounded transition duration-150 ease-in-out">
                        <i className="bi bi-trash"/> Delete template
                    </button>
                    {vocToShow && (
                        <AddCategory template_id={template.template.id} show={vocToShow} voc={vocToShow}
                                     onClose={hideModal}/>
                    )}
                    {Object.keys(vocData).map((voc, key) => {
                        return (
                            <button onClick={() => showModal(vocData[voc])}
                                    className="ml-2 inline-block px-2 py-2 border-2 font-medium text-sm leading-tight uppercase rounded transition duration-150 ease-in-out">
                                <i className="bi bi-plus-circle-fill"/> Add category
                            </button>
                        );
                    })}
                </div>
                    {
                        template.template ? template.template.categories.map((data, index) =>
                            <CategoryCell key={index} category={data}/>
                        ) : null
                    }
            </div>
    )
}

export default TemplateCell;
