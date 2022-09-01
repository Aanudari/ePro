import React from 'react';
import Navigation from '../../components/Navigation';
import { useLocation } from "react-router-dom"

function LeveloneEdit() {
    const location = useLocation();
    console.log(location.state.deviceId)
    return ( 
        <div className="w-full h-full bg-gray-50">
        <Navigation />
        <div className="h-full px-5 py-3">
        <div className="w-full h-full bg-white rounded-lg p-5">
                    {location.state.firstName}
                </div>
        <div></div>
        </div>
      </div>
     );
}

export default LeveloneEdit;