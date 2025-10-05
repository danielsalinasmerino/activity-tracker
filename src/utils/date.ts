import { format, isToday } from "date-fns";

/**
 * Formats a date into a human-readable string with full weekday, month, and year.
 *
 * @param date - The date to format. Must be a valid Date object.
 * @returns A formatted string in the pattern "EEEE, MMMM do, yyyy"
 *          (e.g., "Monday, January 1st, 2024").
 *
 * @remarks
 * Uses the `date-fns` library's `format` function with a locale-aware pattern.
 * The output format includes:
 * - `EEEE`: Full weekday name (Monday, Tuesday, etc.)
 * - `MMMM`: Full month name (January, February, etc.)
 * - `do`: Day of month with ordinal suffix (1st, 2nd, 3rd, etc.)
 * - `yyyy`: Four-digit year
 *
 * **Timezone Considerations:**
 * - Uses the local timezone of the Date object
 * - For consistent timezone handling across users, consider storing/passing
 *   dates in UTC and converting at the presentation layer
 *
 * **Dependencies:**
 * - `date-fns@^3.0.0` or compatible version
 *
 * @example
 * ```typescript
 * const completionDate = new Date('2024-03-15T14:30:00');
 * const formatted = formatDate(completionDate);
 * // => "Friday, March 15th, 2024"
 * ```
 *
 * @example
 * ```typescript
 * // Display activity completion date
 * const completion: ActivityCompletion = {
 *   id: '123',
 *   activityId: 'abc',
 *   completedAt: new Date(),
 *   createdAt: new Date()
 * };
 *
 * const displayDate = formatDate(completion.completedAt);
 * // => "Monday, January 1st, 2024"
 * ```
 *
 * @throws {RangeError} If the date is invalid (e.g., `new Date('invalid')`).
 */
export const formatDate = (date: Date): string => {
  return format(date, "EEEE, MMMM do, yyyy");
};

/**
 * Determines whether a given date falls on the current calendar day.
 *
 * @param date - The date to check against today's date.
 * @returns `true` if the date is today, `false` otherwise.
 *
 * @remarks
 * Delegates to `date-fns`'s `isToday` function, which performs a calendar
 * day comparison (ignoring time components). The comparison is based on the
 * local timezone.
 *
 * **Timezone Considerations:**
 * - Comparison uses the local timezone of the execution environment
 * - "Today" is determined by the system clock and timezone settings
 * - For server-side usage, ensure consistent timezone configuration
 *
 * **Use Cases:**
 * - Filtering completions for daily progress tracking
 * - Conditional UI rendering for today's activities
 * - Daily reminder and notification logic
 *
 * **Dependencies:**
 * - `date-fns@^3.0.0` or compatible version
 *
 * @example
 * ```typescript
 * const now = new Date();
 * isDateToday(now);
 * // => true
 *
 * const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
 * isDateToday(yesterday);
 * // => false
 * ```
 *
 * @example
 * ```typescript
 * // Filter today's completions
 * const todayCompletions = completions.filter(
 *   (completion) => isDateToday(completion.completedAt)
 * );
 * ```
 *
 * @throws {RangeError} If the date is invalid (e.g., `new Date('invalid')`).
 */
export const isDateToday = (date: Date): boolean => {
  return isToday(date);
};
