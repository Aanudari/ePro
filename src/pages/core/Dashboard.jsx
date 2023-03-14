import React from "react";
import Navigation from "../../components/Navigation";
import ValCell from "../../components/sub-components/ValCell";
import { useStateContext } from "../../contexts/ContextProvider";
function Dashboard() {
  const { showTop, setShowTop } = useStateContext();
  return (
    <div className="w-full min-h-[calc(100%-54px)] bg-gray-50 relative">
      <Navigation />
      <div className="h-[calc(100%)] px-5 py-3"></div>
    </div>
  );
}

export default Dashboard;
