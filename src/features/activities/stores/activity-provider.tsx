import React, { useReducer } from "react";
import { ActivityContext } from "./activity-context";
import { activityReducer } from "./activity-store";
import { INITIAL_ACTIVITY_STATE } from "../constants";

interface ActivityProviderProps {
  children: React.ReactNode;
}

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, INITIAL_ACTIVITY_STATE);

  return (
    <ActivityContext.Provider value={{ state, dispatch }}>
      {children}
    </ActivityContext.Provider>
  );
};
