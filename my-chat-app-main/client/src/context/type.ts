import { Dispatch, ReactNode } from "react";
import { Socket } from "socket.io-client";

export interface ContextProviderProps{
    children: ReactNode;
}

// AuthContext Types
export type AuthUser = {
    _id: string;
    fullName: string;
    profilePic: string;
    username: string;
}

export interface AuthContextProps {
    authUser: AuthUser | null;
    setAuthUser: Dispatch<React.SetStateAction<AuthUser | null>>;
}

// SocketContext Types
export interface SocketContextType{
    socket: Socket | null;
    onlineUsers: string[];
}