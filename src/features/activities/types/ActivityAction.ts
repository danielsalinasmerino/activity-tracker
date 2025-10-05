import { Activity, ActivityActionType, ActivityCompletion } from ".";

/**
 * Discriminated union for all activity-related actions.
 * Each action is strongly typed with its specific payload.
 *
 * @example
 * ```typescript
 * const action: ActivityAction = {
 *   type: ActivityActionType.Add,
 *   payload: newActivity
 * };
 * ```
 */
export type ActivityAction =
  | { type: typeof ActivityActionType.Add; payload: Activity }
  | { type: typeof ActivityActionType.Delete; payload: string }
  | { type: typeof ActivityActionType.Complete; payload: ActivityCompletion }
  | { type: typeof ActivityActionType.RemoveCompletion; payload: string };
