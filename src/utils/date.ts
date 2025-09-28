// src/utils/date.ts
import { format, isToday } from "date-fns";

export const formatDate = (date: Date): string => {
  return format(date, "EEEE, MMMM do, yyyy");
};

export const isDateToday = (date: Date): boolean => {
  return isToday(date);
};
