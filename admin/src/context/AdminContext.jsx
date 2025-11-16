import React, { createContext, useState } from 'react'
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { authDataContext } from './AuthContext';

export const adminDataContext = createContext();

const AdminContext = ({ children }) => {
    const [adminData, setAdminData] = useState(null);
    let {serverUrl} = useContext(authDataContext);

    const getAdmin = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/user/getadmin",{withCredentials: true});
            setAdminData(result.data);
            console.log(result.data);
        } catch (error) {
            setAdminData(null);
            console.log("Error fetching admin data:", error);
        }
    }

    useEffect(() => {
        getAdmin();
    }, []);

   let value = {
       adminData,
       setAdminData,
       getAdmin
    }

  return (
      <adminDataContext.Provider value={value} >
        {children}
      </adminDataContext.Provider>
  )
}

export default AdminContext