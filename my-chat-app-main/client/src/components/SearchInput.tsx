import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import useConversation from "../store/useConversation";
import useGetConversations from "../hooks/useGetConversations";
import { Search } from "lucide-react";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState<string>("");
  const { setSelectedChat } = useConversation();
  const { conversations } = useGetConversations();
  const handleSearch = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  },[])

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;

    if (search.length < 3) {
      return toast.error("Searching requires at least 3 characters long");
    }

    const searchedConversation = conversations.
      find((see) => see?.fullName.toLowerCase().includes(search.toLowerCase()));
    
    if (searchedConversation) {
      setSelectedChat(searchedConversation);
      setSearch("");
    } else {
      toast.error("User Does Not Exist!");
   }
  }, [search, conversations, setSelectedChat]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2"
    >
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
        className="input input-bordered rounded-2xl"
      />
      <button className="bg-sky-500 rounded-full p-2 text-center">
        <Search color="#fff" size="32" />
      </button>
    </form>
  );
};

export default SearchInput;
