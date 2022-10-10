import React from 'react';
import Navigation from '../../components/Navigation';
import { useLocation } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from 'axios';
function BranchEdit() {
    const location = useLocation();
    const [data, setdata] = useState();
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
            <div className="h-full px-5 py-3">
                <div className="w-full h-full bg-white rounded-lg p-5">
                    <table className='w-full'>
                        <tbody>
                            <tr className='border w-full'>
                                <th className='w-[200px] p-2 text-center border'>Нэр</th>
                                <th className='w-[200px] p-2 text-center border'>Ажлийн байр</th>
                                <th className='w-[200px] p-2 text-center border'>Улирал</th>
                                <th className='w-[200px] p-2 text-center border'>Жил</th>
                                <th className='w-[200px] p-2 text-center border'>Total</th>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className='border w-full'>
                                <th className='w-[200px] p-2 text-center border'>{location.state.firstName}</th>
                                <th className='w-[200px] p-2 text-center border'>{data ? data.roleName : null}</th>
                                <th className='w-[200px] p-2 text-center border'>2</th>
                                <th className='w-[200px] p-2 text-center border'>2022</th>
                                <th className='w-[200px] p-2 text-center border'>0%</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='w-full h-full bg-white rounded-lg p-5 mt-3'>
                    <div className='w-full h-14 flex items-center bg-[#0563af] rounded-t px-3 font-[400] text-white'>Харилцаа </div>
                    <div className='w-full flex flex-col'>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''>Зөв мэндчилгээ, үдэлт.</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">10%</option>
                            </select>
                        </div>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''>Стандарт хугацаанд угталт хийсэн (3сек) .</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">15%</option>
                            </select>
                        </div>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''>Анхааралтай ойлгож мэдэрч сонсох /ойлгож байгаагаа сонсож байгаагаа илэрхийлсэн.</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">15%</option>
                            </select>
                        </div>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''>Хэрэглэгчийн мэдээллийг баталгаажуулсан, тулгасан.</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">15%</option>
                            </select>
                        </div>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''>Яриаг таслах , Зэрэгцэж ярих ,Сул үг, авиаг тохируулан ашигласан,
                                Мэргэжлийн, техникийн үг хэллэг ашиглаагүй.</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">20%</option>
                            </select>
                        </div>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''> Бүрэн сонсогдохуйц тод, ойлгомжтой,
                                Дууны өнгө найрсаг байсан.</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">25%</option>
                            </select>
                        </div>

                    </div>
                </div>
                <div className='w-full h-full bg-white rounded-lg p-5 mt-3'>
                    <div className='w-full h-14 flex items-center bg-[#0563af] rounded-t px-3 font-[400] text-white'>Хандлага </div>
                    <div className='w-full flex flex-col'>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''>Туслах сонирхолтой,
                                бэлэн байгаагаа илэрхийлсэн.</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">25%</option>
                            </select>
                        </div>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''>Мэдэрсэн, дэмжлэг зөвлөгөө,нэмэлт мэдээлэл өгсөн.</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">35%</option>
                            </select>
                        </div>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''>Эерэг үгс ашигласан, хүндэтгэлтэй хандсан, Тохиромжтой үед "талархасан, уучлалт хүссэн"  "уу, үү " гэж ашигласан.</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">25%</option>
                            </select>
                        </div>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''>Түр хүлээлгэхээс өмнө хэрэглэгчид мэдэгдсэн.</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">15%</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='w-full h-full bg-white rounded-lg p-5 mt-3'>
                    <div className='w-full h-14 flex items-center bg-[#0563af] rounded-t px-3 font-[400] text-white'>АСУУДАЛ ШИЙДВЭРЛЭХ</div>
                    <div className='w-full flex flex-col'>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''>Алдаагүй зөв бүртгэсэн.</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">15%</option>
                            </select>
                        </div>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''>Шаардлагатай нэмэлт асуултыг асууж хэрэглэгчийн асуудлыг гүйцэд  шалгасан, тодорхойлсон.</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">20%</option>
                            </select>
                        </div>
                        <div className='border w-full flex justify-between pl-3 box items-center'>

                            <span className=''>Мэдээллийг энгийн үг хэллэгээр, дэс дараалалтай, эмх цэгцтэй бүрэн бөгөөд үнэн зөв хүргэх.</span>

                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">20%</option>
                            </select>
                        </div>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''>Хэрэглэгчид ойлгоогүй үлдсэн , дахин тодруулах зүйл байгаа эсэхийг асуусан.</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">15%</option>
                            </select>
                        </div>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''>Хэрэглэгчийн санал хүсэлт гомдлыг бүртгэн авч холбогдох алба хэлтэс ажилтанд шилжүүлсэн.</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">10%</option>
                            </select>
                        </div>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''>Хэрэглэгчийн санал хүсэлт гомдлыг бүртгэн авч холбогдох алба хэлтэс ажилтанд шилжүүлсэн.</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">10%</option>
                            </select>
                        </div>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''>Хэрэглэгчийг хүлээлгэх бол шалтгаанаа .
                                хүлээлгийн хугацаа 1 минутаас хэтрэх бол эргэж холбогдох хугацааг хэлж мэдээлэл  хүргэнэ.</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">10%</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='w-full h-full bg-white rounded-lg p-5 mt-3'>
                    <div className='w-full h-14 flex items-center bg-[#0563af] rounded-t px-3 font-[400] text-white'>ХАРАГДАХ БАЙДАЛ</div>
                    <div className='w-full flex flex-col'>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''>ХУВЦАСЛАЛТ
                                30
                                Тухайн үед мөрдлөг болгож буй:  хувцас , гутал , ажлын үнэмлэхийг хамааруулан ойлгоно.</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">30%</option>
                            </select>
                        </div>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''>ЗҮҮЛТ ЧИМЭГЛЭЛ
                                10
                                Ажилтны гоёл чимэглэлийн зүйлс хэт этгээд содон биш, оффис хэв маягийг агуулсан байна.</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">10%</option>
                            </select>
                        </div>
                        <div className='border w-full flex justify-between pl-3 box items-center'>
                            <span className=''>ХУВИЙН АРИУН ЦЭВЭР
                                10
                                Нүүр хүзүү, гарын арьс цэвэр арчилгаатай, амны хөндийн болон биеийн ариун цэврийг чандлан сахина.</span>
                            <select name="" id="" className=''>
                                <option value="">0</option>
                                <option value="">10%</option>
                            </select>
                        </div>
                        <div className='border w-full flex justify-between pl-3 box items-center' >
                            <div className='w-5/6'>
                                <span className=''>АЖЛЫН БАЙРНЫ ЭМХ ЦЭГЦ
                                    50
                                    Хувийн бэлтгэл , зөв суух , ажлын ширээ, ажлын бус шаардлагаар гар утас оролдох, анхаарал сулруулах үйлдлийг  хамааруулан ойлгоно.</span>
                            </div>

                            <select name="" id="" className='w-1/6'>
                                <option value="">0</option>
                                <option value="">50%</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default BranchEdit;
