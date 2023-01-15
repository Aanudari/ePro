import React, { useState } from "react";
import { useEffect } from "react";
import { useTimer } from "react-timer-hook";

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
  return (
    <div className="">
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
