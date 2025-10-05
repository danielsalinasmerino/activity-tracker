import type { ActivityAction, ActivityState } from "../types";

export const activityReducer = (
  state: ActivityState,
  action: ActivityAction
): ActivityState => {
  switch (action.type) {
    case "ADD_ACTIVITY":
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };
    case "DELETE_ACTIVITY":
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.id !== action.payload
        ),
        completions: state.completions.filter(
          (completion) => completion.activityId !== action.payload
        ),
      };
    case "COMPLETE_ACTIVITY":
      return {
        ...state,
        completions: [...state.completions, action.payload],
      };
    case "REMOVE_COMPLETION":
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
