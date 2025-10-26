import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ROUTES } from "@/constants";
import { ActivitiesDashboard } from "@/features/activities";
import { WeekTracker } from "@/features/week-tracker";

import { Navigation } from "./components/navigation";
import { AppProvider } from "./provider";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Navigation />
        <Routes>
          <Route path={ROUTES.DASHBOARD} element={<ActivitiesDashboard />} />
          <Route path={ROUTES.WEEK_TRACKER} element={<WeekTracker />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};
