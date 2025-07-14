"use client";

import React, { createContext, use, useEffect, useState } from "react";

import bn from "@/i18n/bn";
import en from "@/i18n/en";

type Language = "bn" | "en";
type NestedTranslation = {
  [key: string]: string | NestedTranslation;
};

function getNestedTranslation(obj: any, path: string): string {
  return path.split(".").reduce((acc, part) => {
    if (acc && acc[part] !== undefined)
      return acc[part];
    return path;
  }, obj) as string;
}

type TranslationStore = {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string) => string;
};

const TranslationContext = createContext<TranslationStore | undefined>(undefined);

export function TranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<Language>("bn");
  const [translations] = useState<Record<Language, NestedTranslation>>({
    en,
    bn,
  });

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const storedLanguage = localStorage.getItem("language") as Language | null;
        if (storedLanguage) {
          setLanguage(storedLanguage);
        }
      }
      catch (error) {
        console.error("Error loading language from localStorage:", error);
      }
    };
    initializeLanguage();
  }, []);

  const handleSetLanguage = async (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem("language", lang);
    }
    catch (error) {
      console.error("Error saving language to localStorage:", error);
    }
  };

  const t = (key: string) => {
    return getNestedTranslation(translations[language], key);
  };

  const value = { language, setLanguage: handleSetLanguage, t };

  return (
    <TranslationContext
      value={value}
    >
      {children}
    </TranslationContext>
  );
}

export function useTranslation() {
  const context = use(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
