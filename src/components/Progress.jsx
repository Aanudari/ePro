import ProgressBar from "react-bootstrap/ProgressBar";
import { useStateContext } from "../contexts/ContextProvider";
import Navigation from "./Navigation";
function Progress() {
  const { activeMenu } = useStateContext();
  return (
    <div
      className={`fixed custom-index-2 ${
        activeMenu
          ? "top-[56px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)]"
          : "w-full h-full top-[56px] left-0"
      } 
           flex justify-center items-center bg-gray-500 bg-opacity-10
          `}
    >
      <Navigation />
      <div className="w-full h-screen glass flex flex-col justify-center items-center z-20">
        <ProgressBar animated />
      </div>
    </div>
  );
}

export default Progress;
