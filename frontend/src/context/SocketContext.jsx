import { useEffect, useState } from "react";
import {createContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import { useContext } from "react";


const SocketContext = createContext();

export const useSocketContext =() =>{
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
const[socket, setsocket] = useState(null);
const[onlineUsers, setOnlineUsers] = useState([]);
const {authUser} = useAuthContext();

 useEffect(() => {
    if(authUser) {
        const socket = io("https://vibely-i08k.onrender.com" , {
            query: {
                userId: authUser._id,
            },
        });

        setsocket(socket);

        socket.on("getOnlineUsers", (users)=> {
            setOnlineUsers(users);
        })

        return () => socket.close();

    }else{
        if(socket) {
            socket.close();
            setsocket(null);
        }
    }
 } ,[authUser]);
    return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>

}
