import React from "react";

import { Link, useLocation } from "react-router-dom";

import { ROUTES } from "@/constants";

import styles from "./navigation.module.css";

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link
          to={ROUTES.DASHBOARD}
          className={`${styles.link} ${
            location.pathname === ROUTES.DASHBOARD ? styles.active : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to={ROUTES.WEEK_TRACKER}
          className={`${styles.link} ${
            location.pathname === ROUTES.WEEK_TRACKER ? styles.active : ""
          }`}
        >
          Week Tracker
        </Link>
      </div>
    </nav>
  );
};
