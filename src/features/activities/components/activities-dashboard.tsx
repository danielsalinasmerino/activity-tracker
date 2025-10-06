import React from "react";

import { useTranslation } from "react-i18next";

import { formatDate } from "../../../utils/date";
import { useActivities } from "../hooks/use-activities";
import { getTodayCompletedCount } from "../utils";

import { ActivityCard } from "./activity-card";
import { AddActivityForm } from "./add-activity-form";
import styles from "./activities-dashboard.module.css";

export const ActivitiesDashboard: React.FC = () => {
  const { t } = useTranslation();

  const { state } = useActivities();
  const todayCompletedCount = getTodayCompletedCount(state.completions);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t("activity_tracker")}</h1>
        <p className={styles.date}>{formatDate(new Date())}</p>
        <div className={styles.stats}>
          {t("activities.completed", { count: todayCompletedCount })}
        </div>
      </header>

      <main>
        <div className={styles.grid}>
          {state.activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
          <AddActivityForm />
        </div>
      </main>
    </div>
  );
};
