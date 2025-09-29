import { isDateToday } from "../../../utils/date";
import type { ActivityCompletion } from "../types";

export const getTodayCompletions = (
  completions: ActivityCompletion[],
  activityId: string
): ActivityCompletion[] => {
  return completions.filter(
    (completion) =>
      completion.activityId === activityId &&
      isDateToday(completion.completedAt)
  );
};

export const getTodayCompletedCount = (
  completions: ActivityCompletion[]
): number => {
  return completions.filter((completion) => isDateToday(completion.completedAt))
    .length;
};

export const generateId = (): string => {
  return Date.now().toString();
};
