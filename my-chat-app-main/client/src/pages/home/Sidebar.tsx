import { SquarePower } from "lucide-react";
import useLogout from "../../hooks/useLogout";
import { SearchInput, Conversations, Button } from "../../components";

const Sidebar = () => {
  const { loading, logOut } = useLogout();
  return (
    <div className="border rounded-lg border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3" />
      <Conversations />
      <Button
        label="Logout"
        icon={<SquarePower color="#f4f3f2" size="28" />}
        loading={loading}
        action={logOut}
      />
    </div>
  );
};

export default Sidebar;
