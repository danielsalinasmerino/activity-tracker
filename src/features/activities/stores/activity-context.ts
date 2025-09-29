import React, { createContext } from "react";
import type { ActivityAction, ActivityState } from "../types";

interface ActivityContextType {
  state: ActivityState;
  dispatch: React.Dispatch<ActivityAction>;
}

export const ActivityContext = createContext<ActivityContextType | null>(null);
