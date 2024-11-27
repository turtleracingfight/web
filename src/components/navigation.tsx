import styles from "../styles/components/navigation.module.scss";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_LINKS } from "../constants/route.tsx";
import {
  helperExcessMarginNavigation,
  helperNavigationStyles
} from "../utils/usefulFunc.ts";
import { FC, memo } from "react";
import { INavigation } from "../types/ts-navigation.ts";

export const Navigation: FC<INavigation> = memo(({ pathname }) => {
  const navigate = useNavigate();

  const isMargin = helperExcessMarginNavigation(pathname);

  return (
    <div
      className={styles.container}
      style={{ width: isMargin ? "100%" : "90%" }}
    >
      <div
        className={styles.container_content}
        style={{
          background: helperNavigationStyles(pathname).content,
          width: isMargin ? "90%" : "100%"
        }}
      >
        <div
          className={styles.container_content_links}
          style={{ background: helperNavigationStyles(pathname).link }}
        >
          {NAVIGATION_LINKS.map(el => {
            return (
              <button key={el.id} onClick={() => navigate(el.path)}>
                <div
                  className={`${el.path === pathname && styles.container_content_links_ellipse}`}
                ></div>
                <img
                  src={el.path === pathname ? el.visible : el.hidden}
                  alt={el.path}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});
