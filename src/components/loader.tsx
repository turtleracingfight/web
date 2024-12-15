import styles from "../styles/common.module.scss";
import loadingGif from "../../public/components/other/dot.svg";
import initTurtle from "../../public/components/other/initTurtle.png";
import { FC } from "react";

export const Loader: FC<{ isLoadingRequest?: boolean }> = ({
  isLoadingRequest
}) => {
  return (
    <div
      className={styles.loading}
      style={{ background: isLoadingRequest ? "rgba(0, 0, 0, 0.5)" : "black" }}
    >
      <img
        className={
          isLoadingRequest ? styles.loading_load : styles.loading_initTurtle
        }
        src={isLoadingRequest ? loadingGif : initTurtle}
        alt="loading"
      />
    </div>
  );
};
