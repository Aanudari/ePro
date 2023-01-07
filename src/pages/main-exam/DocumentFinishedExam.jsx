import { useStateContext } from "../../contexts/ContextProvider";

function DocumentFinishedExam({ setShowDocument }) {
  const { activeMenu } = useStateContext();
  return (
    <div
      className={`fixed ${
        activeMenu ? "w-[calc(100%-250px)] left-[250px]" : "w-full left-0"
      }  
         !bg-black top-[56px] h-[calc(100%-56px)] !bg-opacity-50  flex justify-end`}
    >
      <div className="from-left bg-gray-100 w-[450px] h-[calc(100%)] flex flex-col justify-between shadow">
        <div className="h-full">
          <h6 className="text-teal-600 text-[14px] flex justify-between mx-3 py-3">
            <span className="font-[500]">
              <i className="bi bi-caret-down-square-fill mr-2"></i>
              Шалгалтын мэдээлэл
            </span>
            <i
              onClick={() => {
                setShowDocument(false);
              }}
              className="bi bi-x-circle cursor-pointer"
            ></i>
          </h6>
          <div className="h-[calc(100%-70px)] overflow-scroll pb-2">
            <div className=" w-full px-3">1</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentFinishedExam;
