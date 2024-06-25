interface HeadingProps {
  isSignUpPage: boolean;
  header: string;
  subHeader: string;
}

const Heading = ({ isSignUpPage, header, subHeader }: HeadingProps) => {
  return (
    <div className="space-y-1 mb-4">
      <h1 className="text-3xl font-semibold text-center text-gray-300">
        {header} &nbsp;
        <span
          className={`${isSignUpPage ? "text-amber-500" : "text-emerald-400"}`}
        >
          Space Chat
        </span>
      </h1>
      <p className="text-center text-gray-300">{subHeader}</p>
    </div>
  );
};

export default Heading;
