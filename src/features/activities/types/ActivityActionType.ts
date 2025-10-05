/**
 * Action type constants for activity operations.
 * Using const object with `as const` for better type inference.
 */
export const ActivityActionType = {
  Add: "ADD_ACTIVITY",
  Delete: "DELETE_ACTIVITY",
  Complete: "COMPLETE_ACTIVITY",
  RemoveCompletion: "REMOVE_COMPLETION",
} as const;

/**
 * Union type derived from action type values.
 */
export type ActivityActionType =
  (typeof ActivityActionType)[keyof typeof ActivityActionType];
