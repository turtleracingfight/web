import styles from "../styles/common.module.scss";
import accept from "../../public/components/other/success.avif";
import { IExpiresContract } from "../types/ts-expiresContract.ts";
import { FC } from "react";

export const ExpiresContract: FC<IExpiresContract> = ({
  handlerAttentionText,
  attentionText
}) => {
  return (
    <div className={styles.expiresContract}>
      <div className={styles.expiresContract_content}>
        <p>{attentionText}</p>
        <img
          width={40}
          height={40}
          src={accept}
          alt="accept"
          onClick={handlerAttentionText}
        />
      </div>
    </div>
  );
};
