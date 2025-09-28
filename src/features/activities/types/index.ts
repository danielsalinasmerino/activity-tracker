import type { BaseEntity, Frequency } from "../../../types";

export interface Activity extends BaseEntity {
  name: string;
  description: string;
  targetFrequency: Frequency;
}

export interface ActivityCompletion extends BaseEntity {
  activityId: string;
  completedAt: Date;
  notes?: string;
}

export interface ActivityState {
  activities: Activity[];
  completions: ActivityCompletion[];
}

export type ActivityAction =
  | { type: "ADD_ACTIVITY"; payload: Activity }
  | { type: "DELETE_ACTIVITY"; payload: string }
  | { type: "COMPLETE_ACTIVITY"; payload: ActivityCompletion }
  | { type: "REMOVE_COMPLETION"; payload: string };
