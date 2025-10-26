import React from "react";

import { addDays, endOfWeek, format, isSameDay, startOfWeek } from "date-fns";

import type {
  Activity,
  ActivityAction,
  ActivityCompletion,
} from "../../activities/types";
import { generateId } from "../../activities/utils";

import styles from "./week-grid.module.css";

interface WeekGridProps {
  activities: ReadonlyArray<Activity>;
  completions: ReadonlyArray<ActivityCompletion>;
  dispatch: React.Dispatch<ActivityAction>;
}

export const WeekGrid: React.FC<WeekGridProps> = ({
  activities,
  completions,
  dispatch,
}) => {
  // Get the current week (Monday to Sunday)
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // 1 = Monday
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  // Generate array of 7 days for the current week (Monday to Sunday)
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Format week range - e.g., "Week from 20-26 October 2025" or "Week from 28 Sept-4 Oct 2025"
  const formatWeekRange = (): string => {
    const startDay = format(weekStart, "d");
    const endDay = format(weekEnd, "d");
    const startMonth = format(weekStart, "MMMM");
    const year = format(weekEnd, "yyyy");

    if (weekStart.getMonth() === weekEnd.getMonth()) {
      // Same month: "Week from 20-26 October 2025"
      return `Week from ${startDay}-${endDay} ${startMonth} ${year}`;
    } else {
      // Different months: "Week from 28 Sept-4 Oct 2025"
      const startMonthShort = format(weekStart, "MMM");
      const endMonthShort = format(weekEnd, "MMM");
      return `Week from ${startDay} ${startMonthShort}-${endDay} ${endMonthShort} ${year}`;
    }
  };

  const weekRange = formatWeekRange();

  // Check if an activity was completed on a specific day
  const isCompleted = (activityId: string, date: Date): boolean => {
    return completions.some(
      (completion) =>
        completion.activityId === activityId &&
        isSameDay(completion.completedAt, date)
    );
  };

  // Get completion ID for a specific activity and date
  const getCompletionId = (activityId: string, date: Date): string | null => {
    const completion = completions.find(
      (c) => c.activityId === activityId && isSameDay(c.completedAt, date)
    );
    return completion?.id || null;
  };

  // Toggle completion for an activity on a specific day
  const toggleCompletion = (activityId: string, date: Date) => {
    const completionId = getCompletionId(activityId, date);

    if (completionId) {
      // Remove completion
      dispatch({ type: "REMOVE_COMPLETION", payload: completionId });
    } else {
      // Add completion
      const newCompletion: ActivityCompletion = {
        id: generateId(),
        activityId,
        completedAt: date,
        createdAt: new Date(),
      };
      dispatch({ type: "COMPLETE_ACTIVITY", payload: newCompletion });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.weekHeader}>
        <h3 className={styles.weekTitle}>{weekRange}</h3>
      </div>

      <div className={styles.grid}>
        {/* Header row with dates */}
        <div className={styles.header}>
          <div className={styles.activityHeader}>Activity</div>
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className={`${styles.dayHeader} ${
                isSameDay(day, today) ? styles.today : ""
              }`}
            >
              <div className={styles.dayName}>{format(day, "EEE")}</div>
              <div className={styles.dayDate}>{format(day, "d")}</div>
            </div>
          ))}
        </div>

        {/* Activity rows */}
        {activities.map((activity) => (
          <div key={activity.id} className={styles.row}>
            <div className={styles.activityCell}>
              <span className={styles.activityName}>{activity.name}</span>
              <span className={styles.activityFrequency}>
                {activity.targetFrequency}
              </span>
            </div>
            {weekDays.map((day) => {
              const completed = isCompleted(activity.id, day);
              return (
                <button
                  key={`${activity.id}-${day.toISOString()}`}
                  onClick={() => toggleCompletion(activity.id, day)}
                  className={`${styles.cell} ${
                    completed ? styles.completed : ""
                  } ${isSameDay(day, today) ? styles.todayCell : ""}`}
                  title={
                    completed
                      ? `Mark as incomplete for ${format(day, "MMM d")}`
                      : `Mark as complete for ${format(day, "MMM d")}`
                  }
                >
                  {completed && <span className={styles.checkmark}>✓</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.completed}`}></div>
          <span>Completed</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox}`}></div>
          <span>Not completed</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.hint}>
            💡 Click any cell to toggle completion
          </span>
        </div>
      </div>
    </div>
  );
};
