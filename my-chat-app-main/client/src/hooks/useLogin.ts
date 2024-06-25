import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "./useAuthContext";

interface loginProps {
  username: string;
  password: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useAuthContext();
  const logIn = async (loginData: loginProps) => {
    const success = handleInputErrors(loginData);
    if (!success) return toast("🧑‍🚀");

    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("app-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        throw new Error("An unknown error occured");
      }
    } finally {
      setLoading(false);
    }
  };
  return { loading, logIn };
};

export default useLogin;

function handleInputErrors({ username, password }: loginProps) {
  if (!username || !password) {
    toast.error("Incomplete form, please fill all the fields");
    return false;
  }

  return true;
}
