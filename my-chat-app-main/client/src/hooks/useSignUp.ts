import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "./useAuthContext";

interface signUpProps {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

const useSignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useAuthContext();

  const signUp = async (signUpData: signUpProps) => {
    const success = handleInputErrors(signUpData);
    if (!success) return toast("🧑‍🚀");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("app-user", JSON.stringify(data));
      setAuthUser(data);

    } catch (error:unknown) {
    if (error instanceof Error) {
            toast.error(error.message);
            } else {
                toast.error('An unknown error occurred');
            }
    } finally {
      setLoading(false);
    }
  };

  return { loading, signUp };
};

export default useSignUp;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}: signUpProps) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Incomplete form, please fill all the fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password is too short, try another one.");
    return false;
  }

  return true;
}
