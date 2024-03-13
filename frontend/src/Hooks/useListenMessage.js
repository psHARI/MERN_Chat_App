
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useEffect } from 'react';

import notificationSound from "C:/vs code/node js/chat app/frontend/src/assets/sounds/notification.mp3";
 

const useListenMessage = () => {
const{socket} = useSocketContext()
const{messages,setMessages} = useConversation();

useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
       newMessage.shouldShake = true;
       const sound = new Audio(notificationSound);
       sound.play();
        setMessages([messages, newMessage])
    })

    return() => socket?.off("newMessage")
},[socket, setMessages, messages])
}

export default useListenMessage