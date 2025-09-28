// src/types/index.ts
export interface BaseEntity {
  id: string;
  createdAt: Date;
}

export type Frequency = "daily" | "weekly";
