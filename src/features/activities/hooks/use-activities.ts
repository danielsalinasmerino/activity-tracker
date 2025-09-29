import { useContext } from "react";
import { ActivityContext } from "../stores/activity-context";

export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("useActivities must be used within an ActivityProvider");
  }
  return context;
};
