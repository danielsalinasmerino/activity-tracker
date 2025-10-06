import React, { useState } from "react";

import { useActivities } from "../hooks/useActivities";
import type { Activity, ActivityCompletion } from "../types";
import { generateId, getTodayCompletions } from "../utils";

import styles from "./activity-card.module.css";

interface ActivityCardProps {
  activity: Activity;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const { state, dispatch } = useActivities();

  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);

  const todayCompletions = getTodayCompletions(state.completions, activity.id);
  const isCompletedToday = todayCompletions.length > 0;

  const handleComplete = () => {
    if (isCompletedToday) {
      const completion = todayCompletions[0];
      dispatch({ type: "REMOVE_COMPLETION", payload: completion.id });
    } else {
      const newCompletion: ActivityCompletion = {
        id: generateId(),
        activityId: activity.id,
        completedAt: new Date(),
        notes: notes.trim() || undefined,
        createdAt: new Date(),
      };
      dispatch({ type: "COMPLETE_ACTIVITY", payload: newCompletion });
      setNotes("");
      setShowNotes(false);
    }
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_ACTIVITY", payload: activity.id });
  };

  return (
    <div
      className={`${styles.card} ${isCompletedToday ? styles.completed : ""}`}
    >
      <div className={styles.header}>
        <div className={styles.content}>
          <h3 className={styles.name}>{activity.name}</h3>
          <p className={styles.description}>{activity.description}</p>
          <span className={styles.badge}>{activity.targetFrequency}</span>
        </div>
        <div className={styles.actions}>
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={styles.actionButton}
            title="Add notes"
          >
            📝
          </button>
          <button
            onClick={handleDelete}
            className={`${styles.actionButton} ${styles.deleteButton}`}
            title="Delete activity"
          >
            🗑️
          </button>
        </div>
      </div>

      {showNotes && !isCompletedToday && (
        <div className={styles.notesSection}>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this activity..."
            className={styles.notesTextarea}
            rows={2}
          />
        </div>
      )}

      {isCompletedToday && todayCompletions[0].notes && (
        <div className={styles.completionNotes}>
          <strong>Notes:</strong> {todayCompletions[0].notes}
        </div>
      )}

      <button
        onClick={handleComplete}
        className={`${styles.completeButton} ${
          isCompletedToday ? styles.completed : ""
        }`}
      >
        {isCompletedToday ? "✓ Completed" : "Mark Complete"}
      </button>
    </div>
  );
};
