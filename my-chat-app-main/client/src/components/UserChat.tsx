import { useSocketContext } from "../hooks/useSocketContext";
import useConversation from "../store/useConversation";
import { userData } from "../store/useConversation";

interface UserChatProps {
  conversation: userData;
  emoji: string;
  lastIndex: boolean;
}

const UserChat = ({ conversation, emoji, lastIndex }: UserChatProps) => {
  const { selectedChat, setSelectedChat } = useConversation();
  const isChatSelected = selectedChat?._id === conversation?._id;
  const { onlineUsers } = useSocketContext();

    const isOnline = onlineUsers.includes(conversation?._id ?? '');

  return (
    <>
      <div
        key={conversation?._id}
        className={`flex items-center rounded-sm px-2 py-1 gap-2 hover:bg-emerald-500/80 cursor-pointer
          ${isChatSelected ? "bg-emerald-500/80" : ""}
        `}
        onClick={() => setSelectedChat(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : "" }`}>
          <div className="w-12 rounded-full">
            <img src={conversation?.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-3">
            <p className="font-bold text-gray-200">{conversation?.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIndex && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default UserChat;
