import React, { useState, useEffect } from "react";

function Countdown({ count, setCount }) {
  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    // <div className="font-[500]  h-10 rounded-none w-[200px]  flex items-center px-2 transition-all custom-btn btn-12 !bg-white">

    <button className="custom-btn btn-19">
      <span className="font-[500]">Шинэчлэх: {count}</span>
      <span className="font-[500]">Logout: {count}</span>
    </button>
  );
}

export default Countdown;
