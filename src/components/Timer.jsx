import React, {useState} from 'react';
import { useTimer } from 'react-timer-hook';

export default function MyTimer({ expiryTimestamp }) {
    const [end, setEnd] = useState(false);
  const {
    seconds,
    minutes,
    hours,
    days,
  } = useTimer({ expiryTimestamp, onExpire: () => setEnd(true) });

  return (
    <div>
      <div style={{fontSize: '45px', color: "white"}}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}