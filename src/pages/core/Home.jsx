import React, { useEffect } from "react";
import Navigation from "../../components/Navigation";
import api from "../../service/instance";
import { logout } from "../../service/examService";
function Home() {
  useEffect(() => {
    api.getData().then((res) => {
      if (res.data.isSuccess === false) {
        logout();
      }
    });
  }, []);
  return (
    <div className="w-full bg-[#50a3a2]">
      <Navigation />
      <div className="h-[calc(100vh-56px)] px-5 py-3 flex gap-2">
        Welcome to E Pro
      </div>
    </div>
  );
}

export default Home;
