interface ButtonProps {
  loading?: boolean;
  label: string;
  icon?: JSX.Element;
  action: () => void;
}

const Button = ({ action, loading, label, icon: Icon }: ButtonProps) => {
  return (
    <button
      onClick={action}
      className="mt-auto group flex items-center gap-1 hover:bg-rose-500 
     ease-out duration-500 max-w-fit p-2 rounded-2xl cursor-pointer"
    >
      {!loading ? (
        <>
          {Icon}
          <p className="hidden group-hover:block text-white ">{label}</p>
        </>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </button>
  );
};

export default Button;
