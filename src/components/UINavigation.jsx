import React from 'react';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

function UINavigation() {
    const navigate = useNavigate();
    const { setUiStatus } = useStateContext();
    function test() {
        var tabsNewAnim = $('#navbarSupportedContent');
        var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
        var activeItemNewAnim = tabsNewAnim.find('.active');
        var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
        var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
        var itemPosNewAnimTop = activeItemNewAnim.position();
        var itemPosNewAnimLeft = activeItemNewAnim.position();
        $(".hori-selector").css({
            "top": itemPosNewAnimTop.top + "px",
            "left": itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
        });
        $("#navbarSupportedContent").on("click", "li", function (e) {
            $('#navbarSupportedContent ul li').removeClass("active");
            $(this).addClass('active');
            var activeWidthNewAnimHeight = $(this).innerHeight();
            var activeWidthNewAnimWidth = $(this).innerWidth();
            var itemPosNewAnimTop = $(this).position();
            var itemPosNewAnimLeft = $(this).position();
            $(".hori-selector").css({
                "top": itemPosNewAnimTop.top + "px",
                "left": itemPosNewAnimLeft.left + "px",
                "height": activeWidthNewAnimHeight + "px",
                "width": activeWidthNewAnimWidth + "px"
            });
        });
    }
    $(document).ready(function () {
        setTimeout(function () { test(); });
    });
    $(window).on('resize', function () {
        setTimeout(function () { test(); }, 500);
    });
    $(".navbar-toggler").click(function () {
        $(".navbar-collapse").slideToggle(300);
        setTimeout(function () { test(); });
    });
    const logout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    };
    return (
        <div className='fixed w-full'>
            <nav className=" navbar navbar-expand-custom navbar-mainbg px-5">
                <button className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars text-white"></i>
                </button>
                <div className="collapse navbar-collapse px-10" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <div className="hori-selector"><div className="left"></div><div className="right"></div></div>
                        <li className="nav-item active">
                            <a onClick={() => {
                                setUiStatus('1')
                                navigate('/levelone-ui')
                            }} className="nav-link" id="javascript:void(0);">
                                <i class="bi bi-activity"></i>
                                Үнэлгээ
                            </a>
                        </li>
                        <li className="nav-item ">
                            <a onClick={() => {
                                setUiStatus('2')
                                navigate('/levelone-ui-take-exam')
                            }} className="nav-link" id="javascript:void(0);"><i className="far fa-clone"></i>Шалгалт өгөх</a>
                        </li>
                        <li className="nav-item">
                            <a onClick={() => {
                                setUiStatus('3')
                                navigate('/levelone-ui-exam-result')
                            }} className="nav-link" id="javascript:void(0);"><i className="far fa-calendar-alt"></i>Шалгалтын дүн</a>
                        </li>
                        <li className="nav-item">
                            <a onClick={() => {
                                setUiStatus('3')
                                navigate('/ui-training')
                            }} className="nav-link" id="javascript:void(0);"><i className="far fa-calendar-alt"></i>Сургалт</a>
                        </li>
                        <li className="nav-item">
                            <a onClick={() => {
                                setUiStatus('4')
                                navigate('/levelone-ui-notification')
                            }} className="nav-link" id="javascript:void(0);"><i className="far fa-copy"></i>Мэдэгдэл</a>
                        </li>
                    </ul>
                </div>

                <div onClick={logout} className='font-[500] text-white cursor-pointer hover:border-b-[2px] flex items-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                        <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                    </svg>
                    Гарах</div>
            </nav>
        </div>

    );
}

export default UINavigation;