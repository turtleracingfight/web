import styles from "../styles/components/handler-mistakes.module.scss";
import { useStoreErrors } from "../store/store-errors.ts";
import { helperErrorType } from "../utils/usefulFunc.ts";
import { memo } from "react";
import { ErrorItem } from "./error-item.tsx";

export const Errors = memo(() => {
  const { errors, removeError } = useStoreErrors();
  return (
    <div className={styles.container}>
      {errors.map(el => {
        const { color, img, name } = helperErrorType(el.type);
        return (
          <ErrorItem
            key={el.id}
            removeError={removeError}
            id={el.id as string}
            text={el.text}
            name={name}
            img={img}
            color={color}
            type={el.type}
          />
        );
      })}
    </div>
  );
});
