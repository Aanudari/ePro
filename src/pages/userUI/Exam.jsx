import React from 'react';
import "./exam.css"
import {useStateContext} from "../../contexts/ContextProvider";
function Exam() {
    const {activeMenu, setActiveMenu, user, deviceId, setInputValue} = useStateContext();
    return (

        <div className='w-full bg-[#f3f6fd] h-full p-4'>
            <div className='w-full h-[70px]'></div>
            <div className='w-full h-full flex justify-around'>
                <div className='bg-white rounded-cus h-[600px] w-7/12 h-full shadow-sm'>
                    <div className='w-full h-[150px] py-4 px-10 border-b'>
                        <div className='flex justify-between'>
                            <h4 className='text-[20px] font-[600]'>Нэр: {user.last_name} {user.first_name}</h4>
                            <h4 className='text-[20px] font-[600]' id="timer" disabled="">Цаг: (00:00:00)</h4>
                        </div>
                        <div className='w-full flex gap-4 mt-2'>
                            <div className=''>
                                <span>Нийт асуулт</span>
                                <h4 className='m-0 text-[20px] font-[600]'>5</h4>
                            </div>
                            <div>
                                <span>Шалгалтын хугацаа (мин)</span>
                                <h4 className='m-0 text-[20px] font-[600]'>25</h4>
                            </div>
                        </div>
                    </div>
                    <div className='h-[450px] w-full px-10'>
                        <div className='w-full h-[450px] overflow-scroll'>
                            <form>
                            <div className="card border-info mb-3">
                                <div className="card-header">Асуулт №1</div>
                                <div className="card-body">
                                    <h5 className="card-title">Үлэмж багцийг 3 сараар сунгах төлбөр хэд вэ?</h5>
                                    <p className="card-text">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
                                                <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                                    23.500
                                                </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
                                            <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                                33.500
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
                                            <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                                13.500
                                            </label>
                                        </div>
                                    </p>
                                </div>
                            </div>
                            </form>
                            <form>
                                <div className="card border-info mb-3">
                                    <div className="card-header">Асуулт №2</div>
                                    <div className="card-body">
                                        <h5 className="card-title">Үлэмж багцийг 3 сараар сунгах төлбөр хэд вэ?</h5>
                                        <p className="card-text">
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="exampleInputEmail1"
                                                       aria-describedby="emailHelp" placeholder="Хариултаа бичиж оруулна уу"/>
                                            </div>
                                        </p>
                                    </div>
                                </div>
                            </form>
                            <form>
                                <div className="card border-info mb-3">
                                    <div className="card-header">Асуулт №3</div>
                                    <div className="card-body">
                                        <h5 className="card-title">Үлэмж багцийг 3 сараар сунгах төлбөр хэд вэ?</h5>
                                        <p className="card-text">
                                            <label htmlFor="inputState" className="form-label">Дараах сонголтоос сонгоно уу</label>
                                            <select id="inputState" className="form-select">
                                                <option>11.000</option>
                                                <option>22.000</option>
                                                <option>33.000</option>
                                                <option>44.000</option>
                                                <option>55.000</option>
                                            </select>
                                        </p>
                                    </div>
                                </div>
                            </form>
                            <form>
                                <div className="card border-info mb-3">
                                    <div className="card-header">Асуулт №4</div>
                                    <div className="card-body">
                                        <h5 className="card-title">Үлэмж багцийг 3 сараар сунгах төлбөр хэд вэ?</h5>
                                        <p className="card-text">
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlSelect2">Дараах сонголтоос сонгоно уу</label>
                                                <select multiple className="form-control"
                                                        id="exampleFormControlSelect2">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                        </p>
                                    </div>
                                </div>
                            </form>
                            <form>
                                <div className="card border-info mb-3">
                                    <div className="card-header">Асуулт №5</div>
                                    <div className="card-body">
                                        <h5 className="card-title">Үлэмж багцийг 3 сараар сунгах төлбөр хэд вэ?</h5>
                                        <p className="card-text">
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlTextarea1">Хариултаа бичнэ үү.</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"/>
                                            </div>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-cus h-[600px] w-4/12 h-full shadow-sm '>
                    <div className='h-[80px] w-full px-4 py-4 border-b'>
                        <h4 className='text-[20px] font-[600]'>Нийт асуултууд</h4>
                    </div>
                    <div className='h-[500px] w-full overflow-scroll'>
                    <ol className="list-group list-group-numbered">
                        <li className="list-group-item d-flex justify-content-between align-items-start list-group-item-success">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Асуулт №1</div>
                               23.500
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start list-group-item-danger">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Асуулт №2</div>
                               Бөглөөгүй!
                            </div>
                        </li>
                    </ol>
                        <br/>
                        <div>
                            <button type="button" className="btn btn-danger">Илгээх</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Exam;
