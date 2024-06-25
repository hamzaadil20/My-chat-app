import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { FieldInput } from "../../components";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp";


const SignUpForm = () => {
   const { loading, signUp } = useSignUp();
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSignUpData({ ...signUpData, [e.target.id]: e.target.value });
    },
    [signUpData]
  );

  const onChangeCheckBox = useCallback(
    (gender: string) => {
      setSignUpData({ ...signUpData, gender });
    },
    [signUpData]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await signUp(signUpData);
    },
    [signUp, signUpData]
  );
    return (
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4">
        <div className="">
          {/* Fullname */}
          <FieldInput
            id="fullName"
            value={signUpData.fullName}
            onChange={onChangeInput}
            isSignUpPage
            textLabel="Full Name"
            type="text"
            placeholder="Enter your full name"
          />

          {/* Username */}
          <FieldInput
            id="username"
            value={signUpData.username}
            onChange={onChangeInput}
            isSignUpPage
            textLabel="Username"
            type="text"
            placeholder="Enter your username"
          />
        </div>
        <div>
          {/* Password */}
          <FieldInput
            id="password"
            value={signUpData.password}
            onChange={onChangeInput}
            isSignUpPage
            textLabel="Password"
            type="password"
            placeholder="Enter your password"
          />

          {/* Confirm Password */}
          <FieldInput
            id="confirmPassword"
            value={signUpData.confirmPassword}
            onChange={onChangeInput}
            isSignUpPage
            textLabel="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
          />
        </div>
        </div>

        {/* Gender Checkbox */}

        <h1 className="mt-4 text-center text-amber-500">
          Select Gender</h1>
          <GenderCheckbox
            value={signUpData.gender}
            onChange={onChangeCheckBox}
          />

          <p className="my-1  text-amber-500">
            Already have an account? &nbsp;
            <Link to="/login" className="text-link text-sm before:bg-amber-500">
              Login
            </Link>
          </p>
          <div className="">
            <button
              disabled={loading}
              className="btn btn-block btn-sm mt-2 bg-amber-600 text-white"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
  )
}

export default SignUpForm;
