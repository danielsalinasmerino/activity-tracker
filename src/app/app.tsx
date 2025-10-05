import React from "react";

import { AppProvider } from "./provider";

import { ActivitiesDashboard } from "@/features/activities";

export const App: React.FC = () => {
  return (
    <AppProvider>
      <ActivitiesDashboard />
    </AppProvider>
  );
};
