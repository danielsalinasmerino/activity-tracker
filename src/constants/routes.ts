/**
 * Application route paths
 */
export const ROUTES = {
  DASHBOARD: "/",
  WEEK_TRACKER: "/week-tracker",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
