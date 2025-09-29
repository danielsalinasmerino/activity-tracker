// src/features/activities/components/activities-dashboard.tsx
import React from "react";
import { ActivityCard } from "./activity-card";
import { AddActivityForm } from "./add-activity-form";
import { useActivities } from "../hooks/use-activities";
import { getTodayCompletedCount } from "../utils/activity-helpers";
import { formatDate } from "../../../utils/date";

export const ActivitiesDashboard: React.FC = () => {
  const { state } = useActivities();
  const todayCompletedCount = getTodayCompletedCount(state.completions);

  return (
    <div>
      <header>
        <h1>Activity Tracker</h1>
        <p>{formatDate(new Date())}</p>
        <div>{todayCompletedCount} activities completed today</div>
      </header>

      <main>
        <div>
          {state.activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
          <div>
            <AddActivityForm />
          </div>
        </div>
      </main>
    </div>
  );
};
