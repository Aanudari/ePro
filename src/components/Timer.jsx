import React, { useState, useEffect } from "react";

import { useTimer } from "react-timer-hook";
import { toast, ToastContainer } from "react-toastify";

export default function MyTimer({ expiryTimestamp, finisher }) {
  const [end, setEnd] = useState(false);
  // console.log(expiryTimestamp);
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => setEnd(true),
  });
  useEffect(() => {
    if (end) {
      finisher();
    }
  }, [end]);
  if (minutes == 3 && seconds == 0) {
    toast.error("3 мин үлдлээ !!!", {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  return (
    <div className="">
      <ToastContainer />
      <div style={{ fontSize: "15px", color: "white", fontWeight: "500" }}>
        <span style={{ fontSize: "15px", color: "white", fontWeight: "500" }}>
          {minutes}
        </span>
        :
        <span style={{ fontSize: "15px", color: "white", fontWeight: "500" }}>
          {seconds}
        </span>
      </div>
    </div>
  );
}
