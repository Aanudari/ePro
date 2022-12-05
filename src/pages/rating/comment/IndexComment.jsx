import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useStateContext} from "../../../contexts/ContextProvider";
import {useLocation, useNavigate} from "react-router-dom";

function IndexComment(rate) {
    const logout = () => {
        localStorage.clear();
        sessionStorage.clear()
        navigate("/");
        window.location.reload();
    };
    const navigate = useNavigate();
    const location = useLocation();
    const {TOKEN} = useStateContext();
    const [comment, setComment] = useState();
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Authorization": `${TOKEN}`,
                "accept": "text/plain",
            },
            url: `http://192.168.10.248:9000/v1/RatingComment/get/${rate.rate.id}`,
        })
            .then(
                res => {
                    if (res.data.resultMessage === "Unauthorized") {
                        logout();
                    } else if (res.data.isSuccess === true) {
                        setComment(res.data.result);
                    }
                }
            )
            .catch(err => console.log(err))
    }, []);
    console.log(comment)
    return(
            <div className="p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400">
                {
                    comment ? comment.map((data, index) =>
                        <div key={index} className="flex">
                            <div className="ml-3 text-sm font-normal">
                                <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">User name</span>
                                <div className="mb-2 text-sm font-normal">Hi Neil, thanks for sharing your thoughts
                                    regarding Flowbite.
                                </div>
                                <a className="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Reply</a>
                            </div>
                        </div>
                    ) : null
                }

            </div>
    )
}

export default IndexComment;
