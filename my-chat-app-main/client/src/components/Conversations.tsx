import UserChat from "./UserChat";
import useGetConversations from "../hooks/useGetConversations";
import { getRandomEmoji } from "../utils/emoji";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="flex flex-col overflow-auto py-2">
      {conversations.map((convo, i) => (
        <UserChat
          key={i}
          conversation={convo}
          emoji={getRandomEmoji()}
          lastIndex={i === conversations.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
