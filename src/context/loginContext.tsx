import React, { createContext, useState, useContext } from 'react';

const LoginContext = createContext();

export const useLogin = () => {
    return useContext(LoginContext);
};

export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
    };


    return (
        <LoginContext.Provider value={{ isLoggedIn, user, login }}>
            {children}
        </LoginContext.Provider>
    );
};
