import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [userCompanyID, setUserCompanyID] = useState(null);
    const [userRoles, setUserRoles] = useState([]); 

    return (
        <AppContext.Provider value={{
            userId,
            setUserId,
            userCompanyID,
            setUserCompanyID,
            userRoles,
            setUserRoles
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
