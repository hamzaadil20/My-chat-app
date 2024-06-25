import {  createContext, useState } from "react";
import { AuthContextProps, AuthUser, ContextProviderProps } from "./type";

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }:ContextProviderProps)=>{
    const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
        const userStored = localStorage.getItem("app-user");
        return userStored ? JSON.parse(userStored) : null;
    });



    const contextValues: AuthContextProps = {authUser,setAuthUser};

    return <AuthContext.Provider
        value={contextValues}
    >
        {children}
    </AuthContext.Provider>
};