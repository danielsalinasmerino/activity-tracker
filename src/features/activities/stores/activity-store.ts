import type { ActivityAction, ActivityState } from "../types";
import { ActivityActionType } from "../types";

export const activityReducer = (
  state: ActivityState,
  action: ActivityAction
): ActivityState => {
  switch (action.type) {
    case ActivityActionType.Add:
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };
    case ActivityActionType.Delete:
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.id !== action.payload
        ),
        completions: state.completions.filter(
          (completion) => completion.activityId !== action.payload
        ),
      };
    case ActivityActionType.Complete:
      return {
        ...state,
        completions: [...state.completions, action.payload],
      };
    case ActivityActionType.RemoveCompletion:
      return {
        ...state,
        completions: state.completions.filter(
          (completion) => completion.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
