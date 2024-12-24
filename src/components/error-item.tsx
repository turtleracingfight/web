import { FC, useEffect, useState } from "react";
import styles from "../styles/components/handler-mistakes.module.scss";
import { EnumHandlerError, TErrorItem } from "../types/ts-store-errors.ts";

export const ErrorItem: FC<TErrorItem> = ({
  img,
  name,
  id,
  text,
  removeError,
  color,
  type
}) => {
  const [offset, setOffset] = useState(94.25);
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => {
        if (prev > 0) return prev - 0.18;
        clearInterval(interval);
        return 0;
      });
    }, 10);
    return () => clearInterval(interval);
  }, [offset]);

  useEffect(() => {
    const intervalSec = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev > 0) return prev - 1;
        clearInterval(intervalSec);
        removeError(id);
        return 0;
      });
    }, 1000);

    return () => clearInterval(intervalSec);
  }, [secondsLeft]);

  return (
    <div
      className={styles.container_mistake}
      onClick={() => removeError(id as string)}
    >
      <img src={img} alt={name} />
      <p style={{ color }}>{text}</p>
      <div className={styles.container_mistake_content}>
        <p
          style={{
            color: type === EnumHandlerError.ERROR ? "red" : "greenyellow"
          }}
        >
          {secondsLeft}
        </p>
        <svg width="40px" height="40px">
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stopColor={"#00ff05"} />
              <stop offset="100%" stopColor={"#c8d300"} />
            </linearGradient>
            <linearGradient id="GradientColorError">
              <stop offset="0%" stopColor="#b90505" />
              <stop offset="100%" stopColor="#e12f12" />
            </linearGradient>
          </defs>
          <circle
            r="15"
            cx="17"
            cy="17"
            fill="none"
            stroke={`url(#${type === EnumHandlerError.ERROR ? "GradientColorError" : "GradientColor"})`}
            strokeWidth="3"
            strokeDasharray="94.25"
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
