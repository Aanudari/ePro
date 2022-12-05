import {Modal} from "react-bootstrap";
import React from "react";


const CreateComment = (props) => {
    const {show, handleClose, handleShow} = props

    return (
        <div>
            <button onClick={handleShow}>Сэтгэгдэл бичих</button>
            <Modal
                show={show}
                onHide={handleClose}
                size="ml"
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="modal-100w"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={handleClose}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={handleClose}>
                        Save Changes
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


export default CreateComment;
