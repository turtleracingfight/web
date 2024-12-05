import styles from "../styles/common.module.scss";
import loadingGif from "../../public/components/other/dot.svg";

export const Loader = () => {
  return (
    <div className={styles.loading}>
      <img src={loadingGif} alt="loading" />
    </div>
  );
};
