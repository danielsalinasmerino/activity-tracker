import React, { useState } from "react";
import { useActivities } from "../hooks/use-activities";
import { getTodayCompletions, generateId } from "../utils/activity-helpers";
import type { Activity, ActivityCompletion } from "../types";

interface ActivityCardProps {
  activity: Activity;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const { state, dispatch } = useActivities();
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");

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
    if (window.confirm("Are you sure you want to delete this activity?")) {
      dispatch({ type: "DELETE_ACTIVITY", payload: activity.id });
    }
  };

  return (
    <div>
      <div>
        <div>
          <h3>{activity.name}</h3>
          <p>{activity.description}</p>
          <span>{activity.targetFrequency}</span>
        </div>
        <div>
          <button onClick={() => setShowNotes(!showNotes)} title="Add notes">
            📝
          </button>
          <button onClick={handleDelete} title="Delete activity">
            🗑️
          </button>
        </div>
      </div>

      {showNotes && !isCompletedToday && (
        <div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this activity..."
            rows={2}
          />
        </div>
      )}

      {isCompletedToday && todayCompletions[0].notes && (
        <div>
          <strong>Notes:</strong> {todayCompletions[0].notes}
        </div>
      )}

      <button onClick={handleComplete}>
        {isCompletedToday ? "✓ Completed" : "Mark Complete"}
      </button>
    </div>
  );
};
