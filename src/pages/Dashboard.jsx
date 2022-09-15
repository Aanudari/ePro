import React from 'react';
import Navigation from '../components/Navigation';

function Dashboard() {
    return (
        <div className="w-full h-screen bg-gray-50">
            <Navigation />
            <div className="h-screen px-5 py-3">
                <div className="w-full h-full bg-white rounded-lg p-5">
                    Dashboard page
                </div>
            </div>
        </div>
    );
}

export default Dashboard;