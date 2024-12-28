import styles from "../styles/components/timer.module.scss";
import { memo, useEffect, useRef, useState } from "react";
import { useStoreContact } from "../store/store-contract.ts";

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return {
    hours: `${hours}`.padStart(2, "0"),
    minutes: `${minutes}`.padStart(2, "0"),
    seconds: `${seconds}`.padStart(2, "0")
  };
};
export const Timer = memo(() => {
  const [time, setTime] = useState(0);
  const requestGetNext = useStoreContact(state => state.requestGetNext);
  const contractCenter = useStoreContact(state => state.contractCenter);
  const intervalRef = useRef<number>(0);

  useEffect(() => {
    (async () => {
      if (contractCenter) {
        const data = await requestGetNext();
        if (data) {
          setTime(data);
        }
      }
    })();
  }, [contractCenter]);

  useEffect(() => {
    if (time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(time => {
          if (time <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [time]);

  const { seconds, minutes, hours } = formatTime(time);

  return (
    <div className={styles.container}>
      <p>{hours}</p>
      <p>:</p>
      <p>{minutes}</p>
      <p>:</p>
      <p>{seconds}</p>
    </div>
  );
});
