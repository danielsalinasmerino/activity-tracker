import React from "react";
import { ActivitiesDashboard } from "@/features/activities";
import { AppProvider } from "./provider";

export const App: React.FC = () => {
  return (
    <AppProvider>
      <ActivitiesDashboard />
    </AppProvider>
  );
};
