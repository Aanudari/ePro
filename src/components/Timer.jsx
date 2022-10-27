import React, {useState} from 'react';
import { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { useStateContext } from '../contexts/ContextProvider';

export default function MyTimer({ expiryTimestamp }) {
    const [end, setEnd] = useState(false);
    const { gameStarted, setGameStarted,gameFinished, setGameFinished } = useStateContext();
  const {
    seconds,
    minutes,
    hours,
    days,
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
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}