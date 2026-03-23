import { createContext, useContext, useState, useEffect } from "react";

const EmailContext = createContext(null);

export function EmailProvider({ children }) {
  const [activeEmail, setActiveEmail] = useState(
    () => localStorage.getItem("userEmail") || ""
  );

  // Sync when Profile saves a new email to localStorage
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "userEmail") setActiveEmail(e.newValue || "");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const updateEmail = (email) => {
    setActiveEmail(email);
    if (email) localStorage.setItem("userEmail", email);
    else       localStorage.removeItem("userEmail");
  };

  return (
    <EmailContext.Provider value={{ activeEmail, updateEmail }}>
      {children}
    </EmailContext.Provider>
  );
}

export function useEmail() {
  return useContext(EmailContext);
}