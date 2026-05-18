import { createContext, useContext, useState } from "react";

export const LangContext = createContext("en");
export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }) => {
  const [langCode, setLangCode] = useState("en");
  return (
    <LangContext.Provider value={{ langCode, setLangCode }}>
      {children}
    </LangContext.Provider>
  );
};