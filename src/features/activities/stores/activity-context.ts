import React, { createContext, useReducer } from "react";
import { activityReducer, initialActivityState } from "./activity-store";
import type { ActivityAction, ActivityState } from "../types";

interface ActivityContextType {
  state: ActivityState;
  dispatch: React.Dispatch<ActivityAction>;
}

export const ActivityContext = createContext<ActivityContextType | null>(null);

interface ActivityProviderProps {
  children: React.ReactNode;
}

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialActivityState);

  return (
    <ActivityContext.Provider value={{ state, dispatch }}>
      {children}
    </ActivityContext.Provider>
  );
};
