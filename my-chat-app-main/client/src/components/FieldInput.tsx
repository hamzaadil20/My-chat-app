import { ChangeEvent } from "react";

interface FieldInputProps {
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isSignUpPage?: boolean;
  textLabel: string;
  type: string;
  placeholder?: string;
}

const FieldInput = ({
  id,
  isSignUpPage,
  textLabel,
  type,
  placeholder,
  value,
  onChange,
}: FieldInputProps) => {
  return (
    <div>
      <label className="label p-2">
        <span
          className={`text-base label-text ${
            isSignUpPage ? "text-amber-500" : "text-emerald-400"
          }`}
        >
          {textLabel}
        </span>
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full input input-bordered h-10"
      />
    </div>
  );
};

export default FieldInput;
