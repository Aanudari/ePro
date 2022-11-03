import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import UserCell from "./sub-components/userCell";
import Loading from "./Loading";

function SearchResult() {
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
        <div className="w-full min-h-screen relative bg-[#23b499]">
        <Navigation />
              <div className="p-2 flex flex-wrap gap-3 justify-around md:justify-start">
            {
              data ? data.map((user, index) =>
                // Ажилтан тус бүрийг UserCell conponent д хувиарлах замаар мэдээллүүдийг харуулав
                <UserCell key={index} data={user} />
              ) : 
              <div>
                {/* <p className="text-white">Илэрц олдсонгүй</p> */}
                <Loading/>
              </div>
            }
              </div>
      </div>
    );
}

export default SearchResult;
