import React from "react";

import { useScopedTranslation } from "@/hooks/useScopedTranslation";
import { formatDate } from "@/utils/date";

import { useActivities } from "../hooks/useActivities";
import { getTodayCompletedCount } from "../utils";

import styles from "./activities-dashboard.module.css";

import { ActivityCard, AddActivityForm } from ".";

export const ActivitiesDashboard: React.FC = () => {
  const { state } = useActivities();
  const { t } = useScopedTranslation("activities.dashboard");

  const todayCompletedCount = getTodayCompletedCount(state.completions);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.date}>{formatDate(new Date())}</p>
        <div className={styles.stats}>
          {t("track.completed", {
            count: todayCompletedCount,
          })}
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
