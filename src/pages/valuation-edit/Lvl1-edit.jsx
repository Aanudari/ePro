import React from 'react';
import Navigation from '../../components/Navigation';
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from "../../contexts/ContextProvider";

function LeveloneEdit() {

    const navigate = useNavigate();
    const location = useLocation();
    const {TOKEN} = useStateContext();
    const [data, setdata] = useState();
    const [show, setshow] = useState(false);
    const navigation = [
        {name: 'Үнэлгээ нэмэх', path: '/add-category', icon: true},
        {name: 'Үнэлгээ өөрчлөх', path: '/channel', icon: true},
    ]

    return (
        <div className="w-full h-full bg-gray-50">
            <Navigation/>
            <div className="h-full flex">
                <div className='w-5/6 p-3 bg-gray-100'>
                    <div className='w-full rounded-lg bg-white p-2 fw-bold'>
                    </div>
                </div>
                <div className='hidden md:block h-screen relative w-[280px]'>
                    <div className='fixed top-0 h-full w-full shadow-sm'>
                        <div className='h-14'/>
                        <div>
                            {
                                navigation.map((e, i) => (
                                    <div
                                        onClick={() => {
                                            navigate(`${e.path}`)
                                        }}
                                        key={i}
                                        className="w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center "
                                    >
                                        <i className={`bi bi-bookmark-check`}/>
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
