import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [panelist, setpanelist] = useState("");
  return (
    <DataContext.Provider
      value={{ account, setAccount, panelist, setpanelist }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;
