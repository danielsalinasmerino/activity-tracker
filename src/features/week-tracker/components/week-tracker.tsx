import React, { useState } from "react";

import { useScopedTranslation } from "@/hooks/useScopedTranslation";

import { useActivities } from "../../activities/hooks/useActivities";

import { ActivitySelector } from "./activity-selector";
import { WeekGrid } from "./week-grid";
import styles from "./week-tracker.module.css";

export const WeekTracker: React.FC = () => {
  const { state, dispatch } = useActivities();
  const { t } = useScopedTranslation("weekTracker");
  const [selectedActivityIds, setSelectedActivityIds] = useState<string[]>(
    state.activities.map((a) => a.id)
  );

  const toggleActivity = (activityId: string) => {
    setSelectedActivityIds((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  const selectedActivities = state.activities.filter((activity) =>
    selectedActivityIds.includes(activity.id)
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.subtitle}>{t("subtitle")}</p>
      </header>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>{t("selectActivities")}</h2>
          <ActivitySelector
            activities={state.activities}
            selectedIds={selectedActivityIds}
            onToggle={toggleActivity}
          />
        </aside>

        <main className={styles.main}>
          {selectedActivities.length === 0 ? (
            <div className={styles.emptyState}>
              <p>{t("noActivitiesSelected")}</p>
            </div>
          ) : (
            <WeekGrid
              activities={selectedActivities}
              completions={state.completions}
              dispatch={dispatch}
            />
          )}
        </main>
      </div>
    </div>
  );
};
