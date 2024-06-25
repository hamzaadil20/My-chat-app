import { useAuthContext } from "../hooks/useAuthContext";
import useConversation, { messageData } from "../store/useConversation";
import { getHours } from "../utils/getHours";



interface MessageSentProps{
  message: messageData ;
}

const MessageSent = ({message}: MessageSentProps) => {
  const { authUser } = useAuthContext();
  const { selectedChat } = useConversation();
  const senderId = message?.senderId;
  if (!authUser || !selectedChat) { return null }
  const fromMessage = senderId === authUser._id;

  const timeStamp = message?.createdAt ? getHours(message.createdAt) : "Invalid Date";

  // Conditional Styling
  const chatLayout = fromMessage ? "chat-end" : "chat-start";
  const chatBgColor = fromMessage ? "bg-emerald-500" : "bg-amber-500";

  // Avatar Pic
  const profPic = fromMessage ? authUser.profilePic : selectedChat.profilePic;

  return (
    <div className={`chat ${chatLayout}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profPic} alt="user-avatar-bubble" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${chatBgColor}`}>
        {message?.message || "No Message Content"}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {timeStamp}
      </div>
    </div>
  );
};

export default MessageSent;
