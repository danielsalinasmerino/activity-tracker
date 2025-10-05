import { ActivityState } from "../types";

export const INITIAL_ACTIVITY_STATE: ActivityState = {
  activities: [
    {
      id: "1",
      name: "Reading",
      description: "Read for at least 30 minutes",
      targetFrequency: "daily",
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Exercise",
      description: "Physical activity or workout",
      targetFrequency: "daily",
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Journaling",
      description: "Write in personal journal",
      targetFrequency: "daily",
      createdAt: new Date(),
    },
  ],
  completions: [],
};
