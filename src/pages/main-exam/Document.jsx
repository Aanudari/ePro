import { useStateContext } from "../../contexts/ContextProvider";
function Document({setShowReport, id}) {
    const {activeMenu} = useStateContext();
    return ( 
        <div className={`fixed ${activeMenu ? 'w-[calc(100%-250px)] left-[250px]' : "w-full left-0"}  
         !bg-black top-[56px] h-[calc(100%-56px)] !bg-opacity-50  flex justify-end`}>
      <div className="from-left bg-white w-[350px] h-full  flex flex-col justify-between shadow">
        <div className="px-3 pt-3">
          <h6 className="text-teal-600 text-[14px] flex justify-between">
            <span className="font-[500]">
              <i className="bi bi-caret-down-square-fill mr-2"></i>
              Шалгалтын дэлгэрэнгүй 
              </span>
            <i onClick={() => {
              setShowReport(false)
            }} className="bi bi-x-circle cursor-pointer"></i>
          </h6>
          <div className=" h-[calc(100%-25px)] overflow-scroll px-4">
            {id}
          </div>
        </div>
        <div className="bg-gray-100 border-t shadow-lg h-[56px] flex items-center px-3">
          <div 
        //     onClick={() => {
        //     setShowModal(true)
        //   }} 
          className="h-9 min-w-[170px] hover:bg-teal-600 bg-teal-500 rounded-sm px-3 flex items-center font-[400] text-white
            cursor-pointer active:bg-teal-400">
            <span className="mr-2 mb-1 font-[400] text-white">
              Excel file татах
            </span>
            <div className="pl-2 h-full flex items-center border-l border-gray-300 ">
            <i className="bi bi-file-earmark-spreadsheet"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
     );
}

export default Document;