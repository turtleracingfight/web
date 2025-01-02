import styles from "../styles/common.module.scss";
import loadingGif from "../../public/components/other/dot.svg";
import initTurtle from "../../public/components/other/initTurtle.avif";
import { FC } from "react";
import { ILoader } from "../types/ts-loader.ts";

export const Loader: FC<ILoader> = ({ isLoadingRequest }) => {
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
