import { useState } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";


const useSendMessage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { messages, setMessages, selectedChat } = useConversation();

    const sendMessage = async (message:string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/messages/send/${selectedChat?._id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            })
            if (!res.ok) {
                throw new Error('Failed to post the data');
            }

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            
            setMessages([...messages, data]);

        }
        catch (error:unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };
    return { loading, sendMessage };
};

export default useSendMessage;
