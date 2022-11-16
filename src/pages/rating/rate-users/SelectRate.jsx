import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import Select from "react-select";

function SelectRate ({ show, voc, onClose, userdata }) {
    const navigate = useNavigate();
    const {TOKEN} = useStateContext();
    const logout = () => {
        localStorage.clear();
        sessionStorage.clear()
        navigate("/");
        window.location.reload();
    };
    const [getRateTemplate, setGetRateTemplate] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Authorization": `${TOKEN}`,
                "accept": "text/plain",
            },
            url: `http://192.168.10.248:9000/v1/RatingTemplate/user/${userdata.deviceId}`,
        })
            .then(
                res => {
                    if (res.data.isSuccess === true) {
                        setGetRateTemplate(res.data.result);
                    }
                    if (res.data.resultMessage === "Unauthorized") {
                        logout();
                    }
                }
            )
            .catch(err => console.log(err))
    }, []);
    const createRateUser = () => {
        navigate(`/create-rate-user`, {state: {template: selectedOption, userinfo: userdata}})
    }
    return (
        <div>
            <Modal
                // size="lg"
                show={show}
                onHide={onClose}
                backdrop="static"
                keyboard={false}
                dialogClassName="modal-100w"
                aria-labelledby="example-modal-sizes-title-sm"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id={`contained-modal-title-${voc.href}`}>
                        Template сонгох
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mt-2">
                        <div className="px-5 pb-5">
                            <Select classname="text-black text-sm-center"
                                    options={getRateTemplate}
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    className="outline-none"
                                    classNamePrefix="!outline-none !hover:bg-red-100"
                                    noOptionsMessage={({inputValue}) => !inputValue && "Сонголт хоосон байна"}
                                    getOptionLabel={(option) => option.name} getOptionValue={(option) => option.id}/>
                            <p>

                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold">
                                    Үнэлгээ өгөх загвараа сонгоно уу. ✍
                                </span>
                                <button onClick={createRateUser}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    next</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default SelectRate;
