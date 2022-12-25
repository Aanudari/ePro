import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import ExamCell from './sub-components/examCell';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function PrepareQuestions() {
    const location = useLocation();
    const [data, setData] = useState();
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
            url: `${process.env.REACT_APP_URL}/v1/Question`,
        })
            .then(
                res => {
                    setData(res.data.result)
                }
            )
            .catch(err => console.log(err))
    }, [])
    return (
        <div className="w-full h-screen bg-gray-50">
            <Navigation />
            <div className="h-screen px-5 py-3">
                <div className="w-full h-full bg-white rounded-lg p-5 flex flex-col gap-2">
                    <h6>
                        Тухайн шалгалтын асуултууд:
                    </h6>
                    {
                        data ? data.map((item, index) => (
                            <ExamCell key={index} data={item} />
                        )) : null
                    }
                </div>
            </div>
        </div>
    );
}

export default PrepareQuestions;
