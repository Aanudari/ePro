import React, {useState} from 'react';
import { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { useStateContext } from '../contexts/ContextProvider';

export default function MyTimer({ expiryTimestamp }) {
    const [end, setEnd] = useState(false);
    const { gameStarted, setGameStarted,gameFinished, setGameFinished, time, setTime } = useStateContext();
  const {
    seconds,
    minutes,
  } = useTimer({ expiryTimestamp, onExpire: () => setEnd(true) });
  useEffect(() => {
    if(end) {
      setGameStarted(!gameStarted)
      setGameFinished(!gameFinished)
    }
  }, [end])
  return (
    <div>
      <div style={{fontSize: '45px', color: "white"}}>
        {/* <span>{minutes}</span>:<span>{seconds}</span> */}
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}