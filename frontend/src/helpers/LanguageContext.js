import React, { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ru");

  useEffect(() => {
    const storedLang = localStorage.getItem("cashAndGoAppLanguage");
    if (storedLang) {
      setLanguage(storedLang);
    } else {
      const browserLang = navigator.language || navigator.languages[0] || "en";
      const defaultLang = browserLang.startsWith("ru") ? "ru" : "en"; // Приоритет ru, если поддерживается
      setLanguage(defaultLang);
      localStorage.setItem("cashAndGoAppLanguage", defaultLang);
    }
  }, []);

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem("cashAndGoAppLanguage", newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);