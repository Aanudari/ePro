import React from 'react';
import Navigation from '../../components/Navigation';
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from "../../contexts/ContextProvider";
import CategoryCell from "../../components/sub-components/category/categoryCell";
import AddCategory from "../../components/sub-components/category/AddCategory";


function LeveloneEdit() {
    const vocData = {
        voc1: { title: "Үнэлгээ нэмэх"},
        // voc2: { title: "Үнэлгээ засварлах", href: "#", content: "voc2-content" },
    };
    const [vocToShow, setVocToShow] = useState(null);
    const showModal = (voc) => setVocToShow(voc);
    const hideModal = () => setVocToShow(null);
    const navigate = useNavigate();
    const location = useLocation();
    const {TOKEN} = useStateContext();
    const [data, setdata] = useState();
    const [template, setTemplate] = useState();
    const [show, setshow] = useState(false);
    // const navigation = [
    //     {name: 'Үнэлгээ нэмэх', path: '/add-category', icon: true},
    //     {name: 'Үнэлгээ өөрчлөх', path: '/channel', icon: true},
    // ]
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Authorization": `${TOKEN}`,
                "accept": "text/plain",
            },
            url: `http://192.168.10.248:9000/v1/User/${location.state.deviceId}`,
        })
            .then(
                res => {
                    setdata(res.data.result)
                }
            )
            .catch(err => console.log(err))
    }, []);
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Authorization": `${TOKEN}`,
                "accept": "text/plain",
            },
            url: `http://192.168.10.248:9000/v1/RatingTemplate/user/${location.state.deviceId}`,
        })
            .then(
                res => {
                    setTemplate(res.data.result);
                    // console.log(res.data.result);
                }
            )
            .catch(err => console.log(err))
    }, []);

    return (
        <div className="w-full h-full bg-gray-50">
            <Navigation/>
            <div className="h-full flex">
                <div className='w-5/6 p-3 bg-gray-100'>
                    <div className='w-full rounded-lg bg-white p-2 fw-bold'>
                        <h5> {template && template.name} {template && template.id}</h5>
                        <div>
                            {
                                template ? template.categories.map((data, index) =>
                                    <CategoryCell key={index} category={data}/>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
                <div className='hidden md:block h-screen relative w-[280px]'>
                    <div className='fixed top-0 h-full w-full shadow-sm'>
                        <div className='h-14'/>
                        <div >
                            {vocToShow && (
                                <AddCategory template_id={template} show={vocToShow} voc={vocToShow} onClose={hideModal} />
                            )}
                            <ul className="p-3">
                                {Object.keys(vocData).map((voc, key) => {
                                    // console.log(vocData[voc]);
                                    return (
                                        <li key={key} className="w-full h-12 cursor-pointer pl-4 hover:bg-gray-300 flex items-center ">
                                            <button onClick={() => showModal(vocData[voc])}>
                                                <small> <i className={`bi bi-bookmark-check`}/> {vocData[voc].title}</small>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                            {/*{*/}
                            {/*    navigation.map((e, i) => (*/}
                            {/*        <div*/}
                            {/*            onClick={() => {*/}
                            {/*                navigate(`${e.path}`)*/}
                            {/*            }}*/}
                            {/*            key={i}*/}
                            {/*            className="w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center "*/}
                            {/*        >*/}
                            {/*            <i className={`bi bi-bookmark-check`}/>*/}
                            {/*            <span className="ml-1 font-[400]">{e.name}</span>*/}
                            {/*        </div>*/}
                            {/*    ))*/}
                            {/*}*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default LeveloneEdit;
