import { isDateToday } from "../../../utils";
import { ActivityCompletion } from "../types";

/**
 * Counts the number of activity completions that occurred today.
 *
 * @param completions - Array of activity completion records to filter and count.
 * @returns The count of completions with a `completedAt` date matching today's date.
 *
 * @remarks
 * This function performs a client-side filter to identify completions that
 * occurred on the current calendar day. The date comparison is handled by
 * the `isDateToday` utility, which should account for timezone considerations.
 *
 * **Performance Considerations:**
 * - Linear time complexity O(n) where n is the number of completions
 * - For large datasets, consider filtering at the data layer or memoizing results
 * - Safe to call frequently as it performs no mutations or side effects
 *
 * **Dependencies:**
 * - Requires `isDateToday(date: Date): boolean` utility function
 *
 * @example
 * ```typescript
 * const completions: ActivityCompletion[] = [
 *   { id: '1', activityId: 'a1', completedAt: new Date(), createdAt: new Date() },
 *   { id: '2', activityId: 'a2', completedAt: new Date('2024-01-01'), createdAt: new Date() },
 *   { id: '3', activityId: 'a3', completedAt: new Date(), createdAt: new Date() }
 * ];
 *
 * const todayCount = getTodayCompletedCount(completions);
 * // => 2 (assuming today is the current date)
 * ```
 *
 * @example
 * ```typescript
 * // Usage in a component to display daily progress
 * const dailyProgress = getTodayCompletedCount(state.completions);
 * console.log(`You've completed ${dailyProgress} activities today!`);
 * ```
 */
export const getTodayCompletedCount = (
  completions: ReadonlyArray<ActivityCompletion>
): number => {
  return completions.filter((completion) => isDateToday(completion.completedAt))
    .length;
};
