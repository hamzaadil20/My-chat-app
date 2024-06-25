import Sidebar from "./Sidebar";
import MainWindow from "./MainWindow";

const Home = () => {
  return (
    <div
      className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400
      bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0
    "
    >
      <div className="flex gap-2">
        <Sidebar />
        <MainWindow />
      </div>
    </div>
  );
};

export default Home;
