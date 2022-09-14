import React from "react";
import Navigation from "./Navigation";
import { useLocation } from "react-router-dom";

function SearchResult() {
    const location = useLocation();

    return (
        <div className="w-full h-screen bg-gray-50">
            <Navigation />
            <div className="h-screen px-5 py-3">
                <div className="w-full h-full bg-white rounded-lg p-5">
                    {location ? location.state.value : null}
                </div>
            </div>
        </div>
    );
}

export default SearchResult;
