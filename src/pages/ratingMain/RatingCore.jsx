import Navigation from "../../components/Navigation";
import RatingControll from "./RatingControll";
import RatingHeader from "./RatingHeader";
import RatingTemplates from "./RatingTemplates";
import { useState } from "react";
import CreateRatingTemplate from "./modal/CreateRatingTemplate";

function RatingCore() {
    const [showModal, setShowModal] = useState(false);
    const [sideMenu, setSideMenu] = useState(false);
    const [tri, setTri] = useState(false);
    return ( 
        <div className="w-full max-h-[calc(100vh-100px)] relative">
            <Navigation />
            <div className="w-full h-full">
                <RatingHeader sideMenu={sideMenu} setSideMenu={setSideMenu}/>
                {
                    sideMenu && 
                <RatingTemplates setShowModal={setShowModal} setSideMenu={setSideMenu}
                tri={tri} setTri={setTri}/>
                }
                <RatingControll/>
            </div>
            {
                showModal && 
                <CreateRatingTemplate tri={tri} setTri={setTri} setShowModal={setShowModal}/>
            }
        </div>
     );
}

export default RatingCore;