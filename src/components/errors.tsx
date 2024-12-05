import styles from "../styles/components/handler-mistakes.module.scss";
import { useStoreErrors } from "../store/store-errors.ts";
import { helperErrorType } from "../utils/usefulFunc.ts";
import { memo } from "react";

export const Errors = memo(() => {
  const { errors, removeError } = useStoreErrors();

  return (
    <div className={styles.container}>
      {errors.map(el => {
        const { color, img, name } = helperErrorType(el.type);
        return (
          <div
            key={el.id}
            className={styles.container_mistake}
            onClick={() => removeError(el.id as number)}
          >
            <img src={img} alt={name} />
            <p style={{ color }}>{el.text}</p>
          </div>
        );
      })}
    </div>
  );
});
