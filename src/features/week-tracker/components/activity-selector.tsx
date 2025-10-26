import React from "react";

import type { Activity } from "../../activities/types";

import styles from "./activity-selector.module.css";

interface ActivitySelectorProps {
  activities: ReadonlyArray<Activity>;
  selectedIds: string[];
  onToggle: (activityId: string) => void;
}

export const ActivitySelector: React.FC<ActivitySelectorProps> = ({
  activities,
  selectedIds,
  onToggle,
}) => {
  return (
    <div className={styles.container}>
      {activities.length === 0 ? (
        <p className={styles.empty}>No activities available</p>
      ) : (
        <div className={styles.list}>
          {activities.map((activity) => {
            const isSelected = selectedIds.includes(activity.id);
            return (
              <label key={activity.id} className={styles.item}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggle(activity.id)}
                  className={styles.checkbox}
                />
                <div className={styles.content}>
                  <span className={styles.name}>{activity.name}</span>
                  <span className={styles.frequency}>
                    {activity.targetFrequency}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};
