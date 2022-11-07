import {Modal} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import {useStateContext} from "../../../contexts/ContextProvider";
import {useNavigate} from "react-router-dom";
import AddCategory from "./AddCategory";

function CreateTemplate ({ show, voc, onClose }) {
    const navigate = useNavigate();
    const {TOKEN} = useStateContext();
    const [templateName, setTemplateName] = useState("");
    const [tempNameEmpty, checkTemplateNameEmpty] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryMaxpoint, setCategoryMaxpoint] = useState("");
    const [categoryDesc, setCategoryDesc] = useState("");
    const [formValuesSub, setFormValuesSub] = useState([{ name: "", description : "", points : "",}])
    const [formValuesCat, setFormValuesCat] = useState([{name: "", description: "" , maxPoints: "", subCategories: [formValuesSub]}])
    const [catNameEmpty, checkCatNameEmpty] = useState(false);
    const [catPointEmpty, checkCatPointEmpty] = useState(false);
    const [catDescEmpty, checkCatDescEmpty] = useState(false);
    const post_template_date = {
        name: templateName,
        roleID: voc.content,
        categories: [formValuesCat],
    };
    console.log(post_template_date);
    const submitCreateTemplate = (e) => {
        e.preventDefault();
        if (templateName.length === 0) {
            checkTemplateNameEmpty(true);
        } else
        {
            axios({
                method: "post",
                headers: {
                    "Authorization": `${TOKEN}`,
                    "Content-Type": "application/json",
                },
                url: `http://192.168.10.248:9000/v1/RatingTemplate/add`,
                data: JSON.stringify(post_template_date),
            })
                .then((res) => {
                    if (res.data.isSuccess === "true") {
                        navigate(0);
                    } else {
                        navigate(0);
                        console.log(res.data)
                    }
                })
                .catch((err) => console.log(err));
        }
    }
    let handleChangeSubCategory = (i, e) => {
        let newFormValues = [...formValuesSub];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValuesSub(newFormValues);
    }
    let addSubCategory = () => {
        setFormValuesSub([...formValuesSub, { name: "", description: "" , points: ""}])
    }

    let removeSubCategory = (i) => {
        let newFormValues = [...formValuesSub];
        newFormValues.splice(i, 1);
        setFormValuesSub(newFormValues)
    }

    let handleChangeCategory = (i, e) => {
        let newFormValues = [...formValuesCat];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValuesCat(newFormValues);
    }
    let addCategory = () => {
        setFormValuesCat([...formValuesCat, { name: "", description: "" , maxPoints: "", subCategories: [formValuesSub]}])
    }
    let removeCategory = (i) => {
        let newFormValues = [...formValuesCat];
        newFormValues.splice(i, 1);
        setFormValuesCat(newFormValues)
    }
    return (
        <div>
            <Modal
                size="lg"
                show={show}
                onHide={onClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby={`contained-modal-title-${voc.href}`}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id={`contained-modal-title-${voc.href}`}>
                        {voc.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {voc.content}
                    <form  onSubmit={submitCreateTemplate}>
                        {formValuesCat.map((element, index) => (
                            <div className="form-inline" key={index}>
                                <label>Name</label>
                                <input type="text" name="name" value={element.name || ""} onChange={e => handleChangeCategory(index, e)} />
                                <label>Email</label>
                                <input type="text" name="email" value={element.email || ""} onChange={e => handleChangeCategory(index, e)} />
                                {
                                    index ?
                                        <button type="button"  className="button remove" onClick={() => removeCategory(index)}>Remove</button>
                                        : null
                                }
                            </div>
                        ))}
                        <div className="button-section">
                            <button className="button add" type="button" onClick={() => addCategory()}>Add</button>
                            <button className="button submit" type="submit">Submit</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export  default CreateTemplate;
