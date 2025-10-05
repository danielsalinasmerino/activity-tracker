import { BaseEntity, Frequency } from ".";

/**
 * Activity definition with target frequency and metadata.
 */
export interface Activity extends BaseEntity {
  name: string;
  description: string;
  targetFrequency: Frequency;
}
