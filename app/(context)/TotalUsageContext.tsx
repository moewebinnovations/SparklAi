import { createContext, useState, ReactNode } from 'react';

interface TotalUsageContextType {
  totalUsage: number;
  setTotalUsage: React.Dispatch<React.SetStateAction<number>>;
}

export const TotalUsageContext = createContext<TotalUsageContextType | undefined>(undefined);

export const TotalUsageProvider = ({ children }: { children: ReactNode }) => {
  const [totalUsage, setTotalUsage] = useState(0);

  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      {children}
    </TotalUsageContext.Provider>
  );
};
