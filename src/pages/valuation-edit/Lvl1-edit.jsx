import React from 'react';
import Navigation from '../../components/Navigation';
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from 'axios';
function LeveloneEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setdata] = useState();
    const [show, setshow] = useState(false);
    const navigation = [
        { name: 'Категори нэмэх', path: '/home', icon: true },
        { name: 'Цэс', path: '/channel', icon: false },
        { name: 'Цэс', path: '/home', icon: false },
        { name: 'Цэс', path: '/channel-program', icon: false },
    ]
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
            url: `http://192.168.10.248:9000/v1/User/${location.state.deviceId}`,
        })
            .then(
                res => {
                    setdata(res.data.result)
                }
            )
            .catch(err => console.log(err))
    }, [])
    return (
        <div className="w-full h-full bg-gray-50">
            <Navigation />
            <div className="h-full flex">
                <div className='w-5/6 p-3 bg-gray-100'>
                    <div className='w-full rounded-lg bg-white p-2'>1</div>
                </div>
                <div className='hidden md:block h-screen relative w-[280px]'>
                    <div className='fixed top-0 h-full w-full shadow-sm'>
                        <div className='h-14'></div>
                        <div>
                            {
                                navigation.map((e, i) => (
                                    <div
                                        // onClick={() => {
                                        //     navigate(`${e.path}`)
                                        // }}
                                        key={i}
                                        className="w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center "
                                    >
                                        <i className={`bi bi-bookmark-check`}></i>
                                        <span className="ml-1 font-[400]">{e.name}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeveloneEdit;
