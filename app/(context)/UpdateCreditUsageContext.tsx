import { createContext, useContext, useState, ReactNode } from "react";

interface UsageContextType {
  totalUsage: number;
  setTotalUsage: React.Dispatch<React.SetStateAction<number>>;
  usageLimit: number;
  setUsageLimit: React.Dispatch<React.SetStateAction<number>>;
}

export const UpdateCreditUsageContext = createContext<UsageContextType | undefined>(undefined);

export const UsageProvider = ({ children }: { children: ReactNode }) => {
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [usageLimit, setUsageLimit] = useState<number>(10000);

  return (
    <UpdateCreditUsageContext.Provider value={{ totalUsage, setTotalUsage, usageLimit, setUsageLimit }}>
      {children}
    </UpdateCreditUsageContext.Provider>
  );
};

export const useUsage = () => {
  const context = useContext(UpdateCreditUsageContext);
  if (!context) {
    throw new Error("useUsage must be used within a UsageProvider");
  }
  return context;
};
