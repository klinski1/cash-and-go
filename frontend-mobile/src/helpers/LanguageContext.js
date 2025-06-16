import React, { createContext, useState, useContext, useEffect } from "react";

// Создаём сам контекст
const LanguageContext = createContext();

// Провайдер, который будет оборачивать наше приложение
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ru");

  // Пример чтения языка из localStorage при монтировании
  useEffect(() => {
    const storedLang = localStorage.getItem("cashAndGoAppLanguage");
    if (storedLang) {
      setLanguage(storedLang);
    } else {
      // Если языка нет в localStorage, устанавливаем язык системы/браузера
      const browserLang = navigator.language || navigator.languages[0] || "en";
      const defaultLang = browserLang.startsWith("ru") ? "ru" : "en"; // Приоритет ru, если поддерживается
      setLanguage(defaultLang);
      localStorage.setItem("cashAndGoAppLanguage", defaultLang);
    }
  }, []);

  // Функция для изменения языка
  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem("cashAndGoAppLanguage", newLang);
  };

  // Передаём в контекст объект со значением языка и функцией смены
  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Хук для удобного доступа к контексту
export const useLanguage = () => useContext(LanguageContext);
