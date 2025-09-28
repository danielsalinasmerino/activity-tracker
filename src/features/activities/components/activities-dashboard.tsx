// src/features/activities/components/activities-dashboard.tsx
import React from "react";
import { ActivityCard } from "./activity-card";
import { AddActivityForm } from "./add-activity-form";
import { useActivities } from "../hooks/use-activities";
import { getTodayCompletedCount } from "../utils/activity-helpers";
import styles from "./activities-dashboard.module.css";
import { formatDate } from "../../../utils/date";

export const ActivitiesDashboard: React.FC = () => {
  const { state } = useActivities();
  const todayCompletedCount = getTodayCompletedCount(state.completions);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Activity Tracker</h1>
        <p className={styles.subtitle}>{formatDate(new Date())}</p>
        <div className={styles.stats}>
          {todayCompletedCount} activities completed today
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.activitiesGrid}>
          {state.activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
          <div className={styles.addActivityContainer}>
            <AddActivityForm />
          </div>
        </div>
      </main>
    </div>
  );
};
