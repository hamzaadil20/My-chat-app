import {useEffect, useState} from 'react'
import useConversation from '../store/useConversation';
import toast from 'react-hot-toast';

const useGetMessages = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { messages, setMessages, selectedChat } = useConversation();
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedChat?._id}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch the messages');
                }
                const data = await res.json();
                setMessages(data);
            }
            catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    throw new Error("An unknown error occured");
                }
            } finally {
                setLoading(false);
            }
        };
        if (selectedChat?._id) {
            getMessages();
        }
    }, [selectedChat, setMessages])

    return { loading, messages: messages || [] };
};
export default useGetMessages;
