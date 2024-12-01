import styles from "../styles/common.module.scss";
import loadingGif from "../../public/components/other/loading.gif";

export const Loader = () => {
  return (
    <div className={styles.loading}>
      <img src={loadingGif} alt="loading" />
    </div>
  );
};
