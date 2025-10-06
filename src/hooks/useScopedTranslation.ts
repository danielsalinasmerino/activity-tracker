import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

/**
 * A typed, scope-aware translation hook that automatically prefixes translation keys.
 *
 * This hook allows you to define a scope (e.g., "activities.dashboard") and then use
 * short keys (e.g., "title") which are automatically prefixed to the full path
 * (e.g., "activities.dashboard.title").
 *
 * @template Namespace - The i18next namespace to use (defaults to "translation")
 * @param scope - The prefix to automatically prepend to all translation keys
 * @param namespace - Optional namespace to load translations from
 *
 * @example
 * ```typescript
 * // With nested keys in en.json:
 * // { "activities": { "dashboard": { "title": "My Dashboard" } } }
 *
 * const { t } = useScopedTranslation("activities.dashboard");
 * t("title") // Returns "My Dashboard"
 * t("activities.dashboard.title") // Also works (prevents double-prefixing)
 * ```
 *
 * @example
 * ```typescript
 * // With pluralization
 * const { t } = useScopedTranslation("header");
 * t("todayCompleted", { count: 5 }) // Uses pluralization rules
 * ```
 */
export function useScopedTranslation<Namespace extends string = "translation">(
  scope: string,
  namespace?: Namespace
) {
  const { t: baseTranslate } = useTranslation(namespace);

  /**
   * Scoped translation function that maintains full i18next typing.
   *
   * Type assertion is necessary here because we're wrapping the original TFunction
   * while preserving all its overload signatures and type information.
   */
  const scopedTranslate: TFunction<Namespace> = ((
    key: string,
    options?: Record<string, unknown>
  ) => {
    // Prevent double-prefixing: if the key already starts with the scope, use it as-is
    // This allows both t("title") and t("activities.dashboard.title") to work
    const scopedKey = key.startsWith(`${scope}.`) ? key : `${scope}.${key}`;

    return baseTranslate(scopedKey, options);
  }) as unknown as TFunction<Namespace>;

  return { t: scopedTranslate };
}
