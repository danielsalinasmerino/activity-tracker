import { Activity, ActivityCompletion } from ".";

/**
 * Application state for activity tracking.
 */
export interface ActivityState {
  activities: ReadonlyArray<Activity>;
  completions: ReadonlyArray<ActivityCompletion>;
}
