import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Send } from "lucide-react";
import useSendMessage from "../hooks/useSendMessage";

interface InputMessageProps {
  type: string;
  placeholder: string;
}

const InputMessage = ({ type, placeholder }: InputMessageProps) => {
  const { loading, sendMessage } = useSendMessage();
  
  const [message, setMessage] = useState<string>("");
  const handleMessageInput = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    await sendMessage(message);
    setMessage("");
  }

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="relative w-full">
        <input
          type={type}
          value={message}
          onChange={handleMessageInput}
          placeholder={placeholder}
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute inset-y-0 end-0 flex items-center pe-3 hover:scale-110 ease-out"
        >
          {loading ? <div className="loading loading-spinner"/>:<Send color="#fff" />}
        </button>
      </div>
    </form>
  );
};

export default InputMessage;
