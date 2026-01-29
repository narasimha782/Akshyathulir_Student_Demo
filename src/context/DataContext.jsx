import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state] = useState({
    fundraising: {
      round: "Seed",
      raisedAmount: 800000,
    },
    teamSize: 8,
    milestones: {
      completed: 8,
      total: 15,
    },
    compliance: {
      completed: 9,
      total: 12,
    },
  });

  return (
    <DataContext.Provider value={{ state }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
