import { isDateToday } from "../../../utils";
import { ActivityCompletion } from "../types";

/**
 * Retrieves all completions for a specific activity that occurred today.
 *
 * @param completions - Array of all activity completion records to filter.
 * @param activityId - The unique identifier of the activity to match.
 * @returns A filtered array containing only completions matching the activity ID
 *          that were completed today.
 *
 * @remarks
 * This function performs a client-side filter with two conditions:
 * 1. Completion must belong to the specified activity
 * 2. Completion date must match the current calendar day (via `isDateToday`)
 *
 * The function is **pure** and performs no mutations or side effects, making it
 * safe for concurrent calls and memoization.
 *
 * **Performance Considerations:**
 * - Time complexity: O(n) where n is the total number of completions
 * - Space complexity: O(k) where k is the number of matching completions
 * - For large datasets, consider:
 *   - Indexing completions by activityId and date at the data layer
 *   - Memoizing results with a cache key of `${activityId}-${todayDate}`
 *   - Filtering at the database/API level before client-side processing
 *
 * **Use Cases:**
 * - Checking daily frequency compliance for an activity
 * - Displaying today's progress for a specific activity
 * - Preventing duplicate daily completions
 * - Generating daily activity reports
 *
 * **Dependencies:**
 * - `isDateToday(date: Date): boolean` - Utility for date comparison
 * - `ActivityCompletion` type from domain models
 *
 * @example
 * ```typescript
 * const completions: ActivityCompletion[] = [
 *   {
 *     id: '1',
 *     activityId: 'exercise',
 *     completedAt: new Date(),
 *     createdAt: new Date()
 *   },
 *   {
 *     id: '2',
 *     activityId: 'reading',
 *     completedAt: new Date(),
 *     createdAt: new Date()
 *   },
 *   {
 *     id: '3',
 *     activityId: 'exercise',
 *     completedAt: new Date('2024-01-01'),
 *     createdAt: new Date('2024-01-01')
 *   }
 * ];
 *
 * const todayExercise = getTodayCompletions(completions, 'exercise');
 * // => [{ id: '1', activityId: 'exercise', completedAt: ..., createdAt: ... }]
 * ```
 *
 * @example
 * ```typescript
 * // Check if daily activity is already completed
 * const activity: Activity = {
 *   id: 'morning-run',
 *   targetFrequency: 'daily',
 *   // ...
 * };
 *
 * const todayCompletions = getTodayCompletions(
 *   state.completions,
 *   activity.id
 * );
 *
 * const isCompleted = todayCompletions.length > 0;
 * const canComplete = activity.targetFrequency === 'daily'
 *   ? todayCompletions.length === 0
 *   : true;
 * ```
 *
 * @example
 * ```typescript
 * // Display today's completion notes for an activity
 * const notes = getTodayCompletions(completions, activityId)
 *   .map(c => c.notes)
 *   .filter((note): note is string => note !== undefined)
 *   .join(', ');
 * ```
 */
export const getTodayCompletions = (
  completions: ReadonlyArray<ActivityCompletion>,
  activityId: string
): ReadonlyArray<ActivityCompletion> => {
  return completions.filter(
    (completion) =>
      completion.activityId === activityId &&
      isDateToday(completion.completedAt)
  );
};
