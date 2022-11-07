import { useNavigate } from "react-router-dom";

function MainNavigation() {
    const navigate = useNavigate();
    return (
        <div className="relative width-nav">
            <div className="core fixed">
                <nav id="side-nav">
                    <div onClick={() => { navigate("/home"); }} className="h-14 bg-gray-700 shadow text-gray-100
                    flex items-center text-2xl font-[700] cursor-pointer
                    ">
                        <span className="hover:scale-105 transition w-full h-full flex
                        items-center
                        font-bold ml-12">
                            E-PRO
                        </span>
                    </div>
                    <ul className="h-full">
                        <li>
                            <a onClick={() => {
                                navigate("/dashboard");
                            }}>
                                <i className="bi bi-calendar-check absolute top-[17px] left-[17px]"></i>
                                <span>Хянах самбар</span></a>
                        </li>
                        <li>
                            <a className="relative">
                                <i className="bi bi-clock absolute top-[17px] left-[17px]"></i>
                                <span >Шалгалт</span></a>
                            <ul>
                                <li><a onClick={() => { navigate("/exam-form"); }}>Шалгалт үүсгэх</a></li>
                                <li><a onClick={() => {
                                    navigate("/take-exam");
                                }}>Шалгалт өгөх</a></li>
                                <li><a onClick={() => {
                                    navigate("/exam-result");
                                }}>Шалгалтын дүн харах</a></li>
                            </ul>
                        </li>
                        <li>
                            <a>
                                <i className="bi bi-bar-chart-line absolute top-[17px] left-[17px]"></i>
                                <span>Үнэлгээ</span></a>
                            <ul>
                                <li><a onClick={() => {
                                    navigate("/rating");
                                }}>Үнэлгээ үүсгэх</a></li>
                                <li><a onClick={() => {
                                   navigate("/level-one");
                                }}>level 1</a></li>
                                <li><a onClick={() => {
                                   navigate("/complain");
                                }}>Complain</a></li>
                                <li><a onClick={() => {
                                   navigate("/telesales");
                                }}>Telesales</a></li>
                                <li><a onClick={() => {
                                   navigate("/online");
                                }}>Online</a></li>
                                <li><a onClick={() => {
                                   navigate("/branch");
                                }}>Branch</a></li>
                                <li><a onClick={() => {
                                   navigate("/installer");
                                }}>Installer</a></li>
                                <li><a onClick={() => {
                                   navigate("/care");
                                }}>Care</a></li>
                                <li><a onClick={() => {
                                   navigate("/bank");
                                }}>Bank</a></li>
                            </ul>
                        </li>
                        <li>
                            <a>
                                <i className="bi bi-book absolute top-[17px] left-[17px]"></i>
                                <span>Сургалт</span></a>
                            <ul>
                                <li><a onClick={() => {
                                    navigate("/create-training");
                                }}>Сургалт төлөвлөх</a></li>
                                <li><a onClick={() => {
                                    navigate("/took-training");
                                }}>Сургалтанд хамрагдсан</a></li>
                                <li><a onClick={() => {
                                    navigate("/trainings");
                                }}>Сургалтууд</a></li>

                            </ul>
                        </li>
                        <li>
                            <a onClick={() => {
                                navigate("/calendar");
                            }}>
                                <i className="bi bi-calendar-check absolute top-[17px] left-[17px]"></i>
                                <span>Calendar</span></a>
                        </li>
                        {/* <li>
                        <a>
                            <i className="fa fa-paper-plane-o"></i>
                            <span>Share</span></a>
                    </li>
                    <li>
                        <a>
                            <i className="fa fa-star-o"></i>
                            <span>Favorite</span></a>
                    </li> */}
                    </ul>
                    <a id="toggle">
                        <i className="fa fa-chevron-circle-left"></i></a>
                </nav>
            </div>
        </div>


    );
}

export default MainNavigation;
