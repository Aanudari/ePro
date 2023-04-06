import { useStateContext } from "../../../contexts/ContextProvider";

function ExcelConfirm({ setConfirm, excelUrl }) {
  const { activeMenu } = useStateContext();
  return (
    <div
      className={`fixed ${
        activeMenu ? "w-[calc(100%-250px)] left-[250px]" : "w-full left-0"
      }  
     !bg-black top-[56px] h-[calc(100%-56px)] !bg-opacity-50  flex justify-center items-center z-20`}
    >
      <div className="p-3 bg-gray-100 rounded-lg w-3/4 md:w-1/3">
        <div className="bg-white rounded-lg px-2 md:px-10 pt-3">
          <div className="flex flex-col items-center justify-center">
            {excelUrl != null || "" ? (
              <p className="text-gray-600 text-[15px] font-[500] m-0 text-center">
                Татах товчыг дарж баталгаажуулна уу.
              </p>
            ) : (
              <div className="flex items-center flex-col">
                <i className="bi bi-emoji-frown text-lg"></i>
                <p className="text-gray-600 text-[15px] font-[500] m-0 text-center">
                  File татах боломжгүй байна.
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-end items-end">
            <a
              onClick={() => setConfirm(false)}
              href={`${excelUrl}`}
              download
              className="px-3 py-2 border rounded mt-2 mb-1 font-[500] text-[14px] text-gray-600 hover:bg-teal-600
          hover:text-white hover:!border-teal-600 transition-all"
            >
              Татах
            </a>
            <button
              onClick={() => {
                setConfirm(false);
              }}
              id={"intro-bg"}
              className="px-3 py-2 border hover:bg-teal-500 transition-all
          hover:text-white hover:!border-teal-500 rounded ml-2 mt-2 mb-1 text-[14px] border-box min-w-[50px]"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExcelConfirm;
