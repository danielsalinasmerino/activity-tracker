import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";

// Define available languages
const resources = {
  en: { translation: en },
  // Add more languages here as you expand
  // es: { translation: es },
} as const;

// Get saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem("i18n-language") || "en";

i18next
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: savedLanguage, // Use saved language preference
    fallbackLng: "en", // Fallback if translation is missing

    interpolation: {
      escapeValue: false, // React already handles XSS protection
    },

    // Save language preference to localStorage on change
    detection: {
      caches: ["localStorage"],
    },
  });

// Persist language changes to localStorage
i18next.on("languageChanged", (lng) => {
  localStorage.setItem("i18n-language", lng);
});

export default i18next;
