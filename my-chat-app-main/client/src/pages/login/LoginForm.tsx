import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { FieldInput } from "../../components";
import useLogin from "../../hooks/useLogin";
const LoginForm = () => {
    const { loading, logIn } = useLogin();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLoginData({ ...loginData, [e.target.id]: e.target.value });
    },
    [loginData]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await logIn({
        username: loginData.username,
        password: loginData.password,
      });
    },
    [loginData, logIn]
  );
  
    return (
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <FieldInput
            id="username"
            value={loginData.username}
            onChange={onChangeInput}
            isSignUpPage={false}
            textLabel="Username"
            type="text"
            placeholder="Enter your username"
          />

          {/* Password */}
          <FieldInput
            id="password"
            value={loginData.password}
            onChange={onChangeInput}
            isSignUpPage={false}
            textLabel="Password"
            type="password"
            placeholder="Enter your password"
          />

          <p className="my-4 text-emerald-400">
            Don&apos;t have an account yet? &nbsp;
            <Link
              to="/signup"
              className="text-link text-sm before:bg-emerald-400"
            >
              Sign Up
            </Link>
          </p>

          <button
            disabled={loading}
            className="btn btn-block btn-sm mt-2 bg-emerald-600 text-white"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
  )
}

export default LoginForm;
