import { BaseEntity } from ".";

/**
 * Record of a completed activity instance.
 */
export interface ActivityCompletion extends BaseEntity {
  activityId: string;
  completedAt: Date;
  notes?: string;
}
