import React from "react";

import { ActivityProvider } from "@/features/activities";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return <ActivityProvider>{children}</ActivityProvider>;
};
