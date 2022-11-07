import React from "react";
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import {Modal} from "react-bootstrap";

function CreateRate ({ show, voc, onClose, deviceId }) {
    const navigate = useNavigate();
    const {TOKEN} = useStateContext();
    return (
        <div>
            <Modal
                size="lg"
                show={show}
                onHide={onClose}
                backdrop="static"
                // keyboard={false}
                dialogClassName="modal-90w"
                // aria-labelledby={`contained-modal-title-${voc.href}`}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id={`contained-modal-title-${voc.href}`}>
                        {voc.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {deviceId}
                </Modal.Body>
            </Modal>
        </div>

    )
}

export default CreateRate;
