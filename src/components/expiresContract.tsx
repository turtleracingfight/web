import styles from "../styles/common.module.scss";
import accept from "../../public/components/other/success.png";

export const ExpiresContract = ({
  isAttention,
  handlerIsAttention
}: {
  isAttention: string;
}) => {
  return (
    <div className={styles.expiresContract}>
      <div className={styles.expiresContract_content}>
        <p>{isAttention}</p>
        <img
          width={40}
          height={40}
          src={accept}
          alt="accept"
          onClick={handlerIsAttention}
        />
      </div>
    </div>
  );
};
