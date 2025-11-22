import { createContext } from "react";

export const authDataContext = createContext();

const AuthContext = ({ children }) => {
    let serverUrl = "https://eagle-wheat.vercel.app";
    
    let value = {
        serverUrl
    }
  return <>
     <authDataContext.Provider value={value}>
        {children}
     </authDataContext.Provider>
  </>;
};

export default AuthContext;
