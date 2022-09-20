import { useState, useEffect, useRef } from "react";

function useTimer() {
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const interval = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (startTime > 0) {
      interval.current = setInterval(() => {
        setTime(() => {
          return Date.now() - startTime;
        });
      }, 1000);
    } else if (interval.current) {
      clearInterval(interval.current);
      interval.current = undefined;
    }
  });

  function start() {
    setStartTime(Date.now());
  }

  return { start, time };
}

export default useTimer;
