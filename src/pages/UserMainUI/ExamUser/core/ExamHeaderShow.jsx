import { useNavigate } from "react-router-dom";

function ExamHeaderShow() {
  const navigate = useNavigate();
  return (
    <div className="h-[60px] top-0 fixed bottom-0 bg-white shadow-sm w-full flex justify-end px-10">
      <nav
        onClick={() => {
          navigate("/user-main");
        }}
        className="header-navigation-links bg-teal-500 px-3 my-2 rounded cursor-pointer"
      >
        <a className="cursor-pointer !text-white"> Оноотой танилцсан </a>
      </nav>
    </div>
  );
}

export default ExamHeaderShow;
