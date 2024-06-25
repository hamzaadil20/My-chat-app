import InputMessage from "../../components/InputMessage";
import Messages from "../../components/Messages";
import { Rocket } from "lucide-react";
import useConversation from "../../store/useConversation";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const MainWindow = () => {
  const { authUser } = useAuthContext();
  const { selectedChat, setSelectedChat } = useConversation();

  // Unmount cleaning up the selectedChat state when logout
  useEffect(() => {
    return () => setSelectedChat(null);
  }, [setSelectedChat]);

  const messageBox = (
    <>
      <div className="bg-slate-500 px-4 py-2 mb-2">
        <span className="label-text">To:</span>
        <span className="text-gray-900 font-bold">
          &nbsp; {selectedChat?.fullName}
        </span>
      </div>

      <Messages />
      <InputMessage type="text" placeholder="Send a message..." />
    </>
  );

  const defaultHome = (
    <>
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex flex-col items-center gap-4 px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold ">
          <Rocket color="#fff" size="64" />
          <p>Welcome <span className="text-2xl font-bold text-indigo-400">{authUser?.fullName}</span> !🧑‍🚀</p>
          <p>Start messaging by selecting users on the sidebar!</p>
        </div>
      </div>
    </>
  );

  return (
    <div className="md:min-w-[450px] flex flex-col border rounded-md">
      {selectedChat ? messageBox : defaultHome};
    </div>
  );
};

export default MainWindow;
