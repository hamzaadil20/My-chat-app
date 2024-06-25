import { useCallback, useEffect } from "react";
import { useSocketContext } from "./useSocketContext";
import useConversation from "../store/useConversation";
import { messageData } from "../store/useConversation";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    const handleNewMessage = useCallback((newMessage: messageData) => {
        setMessages([...messages, newMessage])
    }, [messages,setMessages]);
    
    useEffect(() => {
       socket?.on("newMessage", handleNewMessage)		
       return () => {socket?.off("newMessage")}
    }
    ,[socket, handleNewMessage]);
}

export default useListenMessages;
