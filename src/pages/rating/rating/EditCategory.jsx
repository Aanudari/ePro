import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import {Modal} from "react-bootstrap";
import axios from "axios";

function EditCategory ({ show, voc, onClose, category}) {
    const navigate = useNavigate();
    const {TOKEN} = useStateContext();
    const [value, setValue] = useState();

    const editCategory = () => {
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
                        <div>
                            <input value={value} onChange={(e) => {setValue(e.target.value)}}/>
                            {value}
                        </div>
                    </Modal.Body>
                </Modal>
        </div>
    )
}

export default EditCategory;
