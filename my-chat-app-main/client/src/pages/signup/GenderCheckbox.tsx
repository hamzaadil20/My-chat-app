interface CheckboxProps {
  value: string;
  onChange: (gender: string) => void;
}

const GenderCheckbox = ({ value, onChange }: CheckboxProps) => {
  return (
    <div className="flex justify-center gap-6">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            value === "male" ? "selected" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={value === "male"}
            onChange={() => onChange("male")}
            className="checkbox checkbox-warning border-slate-900"
          />
          <span className="label-text text-amber-500">Male</span>
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            value === "female" ? "selected" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={value === "female"}
            onChange={() => onChange("female")}
            className="checkbox checkbox-warning border-slate-900"
          />
          <span className="label-text text-amber-500">Female</span>
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
