import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import UserCell from "./sub-components/userCell";

function SearchResult() {
    let location = useLocation();
    const { TOKEN, inputValue } = useStateContext();
    const [data, setdata] = useState();
    useEffect(() => {
        axios({
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": TOKEN
            },
            url: `${process.env.REACT_APP_URL}/v1/User/search`,
            data: JSON.stringify({ firstName: inputValue }),
        })
            .then((res) => {
                setdata(res.data.result)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [inputValue])
    return (
        <div className="w-full h-screen bg-gray-50">
            <Navigation />
            <div className="h-screen px-5 py-3">
                <div className="w-full h-full bg-white rounded-lg p-5">
                    {
                        data ? data.map((user, index) =>
                            <UserCell key={index} data={user} />
                        ) : <div>Илэрц олдсонгүй !</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchResult;
