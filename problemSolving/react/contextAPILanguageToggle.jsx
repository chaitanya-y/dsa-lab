// 3. Context API Language Toggle

// Create a React app that uses the Context API to manage a user’s favorite programming language. Display the current language on the page, and provide a button that toggles the value between JavaScript and Python. The child component should consume the context and update the displayed language when the button is clicked.


import React, { createContext, useContext, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

// 1. Create context
const LanguageContext = createContext(null);

// 2. Provider component
function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("JavaScript");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "JavaScript" ? "Python" : "JavaScript"));
  };

  // useMemo avoids recreating the object on every render
  const value = useMemo(() => {
    return {
      language,
      toggleLanguage,
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// 3. Custom hook for cleaner usage
function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}

// 4. Child component consuming context
function MainSection() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div>
      <p id="favoriteLanguage">
        Favorite programming language: {language}
      </p>
      <button id="changeFavorite" onClick={toggleLanguage}>
        Toggle language
      </button>
    </div>
  );
}

// 5. App
function App() {
  return (
    <LanguageProvider>
      <MainSection />
    </LanguageProvider>
  );
}


//TS version
// import React, {
//   createContext,
//   useContext,
//   useMemo,
//   useState,
//   type ReactNode,
// } from "react";
// import { createRoot } from "react-dom/client";

// type Language = "JavaScript" | "Python";

// type LanguageContextType = {
//   language: Language;
//   toggleLanguage: () => void;
// };

// const LanguageContext = createContext<LanguageContextType | null>(null);

// type LanguageProviderProps = {
//   children: ReactNode;
// };

// function LanguageProvider({ children }: LanguageProviderProps) {
//   const [language, setLanguage] = useState<Language>("JavaScript");

//   const toggleLanguage = () => {
//     setLanguage((prev) => (prev === "JavaScript" ? "Python" : "JavaScript"));
//   };

//   const value = useMemo<LanguageContextType>(
//     () => ({
//       language,
//       toggleLanguage,
//     }),
//     [language]
//   );

//   return (
//     <LanguageContext.Provider value={value}>
//       {children}
//     </LanguageContext.Provider>
//   );
// }

// function useLanguage(): LanguageContextType {
//   const context = useContext(LanguageContext);

//   if (!context) {
//     throw new Error("useLanguage must be used within LanguageProvider");
//   }

//   return context;
// }

// function MainSection() {
//   const { language, toggleLanguage } = useLanguage();

//   return (
//     <div>
//       <p id="favoriteLanguage">Favorite programming language: {language}</p>
//       <button id="changeFavorite" onClick={toggleLanguage}>
//         Toggle language
//       </button>
//     </div>
//   );
// }

// function App() {
//   return (
//     <LanguageProvider>
//       <MainSection />
//     </LanguageProvider>
//   );
// }

// const container = document.getElementById("root");

// if (!container) {
//   throw new Error('Root element with id "root" not found');
// }


const root = createRoot(document.getElementById("root"));
root.render(<App />);