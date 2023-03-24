import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../../contexts/ContextProvider";

function ExamHeaderShow() {
  const navigate = useNavigate();
  const { sore } = useStateContext();
  return (
    <div className="h-[60px] top-0 fixed bottom-0 bg-white shadow-sm w-full flex justify-center px-10">
      <div className="w-full md:w-2/3 flex justify-between">
        <div className="flex flex-col justify-center h-[60px] items-start m-0">
          <h6 className="text-[16px] m-0 text-gray-500">Оноо: {sore}%</h6>
        </div>
        <nav
          onClick={() => {
            navigate("/user-exam");
          }}
          className="header-navigation-links bg-teal-500 px-3 my-2 rounded cursor-pointer"
        >
          <a className="cursor-pointer !text-white"> Оноотой танилцсан </a>
        </nav>
      </div>
    </div>
  );
}

export default ExamHeaderShow;
