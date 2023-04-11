import CreateRatingModal from "../modal/CreateRatingModal";
import Folder from "../Folder";
import { useState } from "react";
import { useEffect } from "react";
function RatingBoard({ showModal, setShowModal, data, setTrigger, trigger }) {
  const [expandKey, setExpandKey] = useState(0);
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedQuarter, setSelectedQuarter] = useState();
  const [quarterName, setQuarterName] = useState();
  const recalldata = (param) => {
    setSelectedQuarter(param);
  };
  useEffect(() => {
    recalldata();
  }, [trigger]);
  return (
    <div className={`w-full p-2 h-full rounded `}>
      {showModal && (
        <CreateRatingModal
          setTrigger={setTrigger}
          trigger={trigger}
          setShowModal={setShowModal}
        />
      )}
      <div className="w-full h-[calc(100vh-160px)] overflow-scroll py-2 flex flex-col gap-2">
        <div className="w-full p-2 rounded bg-teal-500 flex items-center justify-end relative gap-2">
          <span className="absolute left-10 text-white text-[15px] font-[500]">
            / {selectedYear} / {quarterName}
          </span>
          {data?.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedYear(item.year);
                  setSelectedQuarter();
                  setQuarterName();
                }}
                className={`rounded ${
                  item.year == selectedYear
                    ? "!text-gray-700 bg-white"
                    : "text-gray-500 bg-gray-300"
                } p-2 text-[14px] font-[500] 
                select-none cursor-pointer flex  items-center gap-2`}
              >
                <img
                  className="w-[25px]"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADfUlEQVR4nO1dXU8TQRTdF/wT1iZFSBSiD5ZdH4lb/4K/SaN8lPgX9sUYpNDYWr400KoPtfMgpkO7ib+giXbnrSRjploVsbSU3pkpe05yXsiS3HPPnXtn7ybgOAAAAAAAAAAx1t9+TGzslV9u7FXaXe5X1vPvPsyaSrxt8ZCLze2XW7n9ijzNciu/+/563OMhh6q0s2IrPb6IezzkUEe8v+Dyt7jHQ45zqk0qxj2e2AnOWRbPhRE9cOdFxl0VGe8o8j0hMp48j4MEiwG/P25eNp5fmo+E7660fW9OW+Llo7lrIuM+j3z3RKdgYZkBp81wT4Tvrcl0eoo++b63Y1qwsMyAP3S3SU1QlT9KYK3F9EDBrcW0tuTTxuNmyXr+RduOYtv35MHN1EDBhzOp7rPUyaeOJ8q4nfbD+7fHboBydhTBjXvzsphIDBRcTCRkMz1PboCWeHxvmcKAL6MEU55JDS24MjtNboCWeHzvM4UB0SjBlJLJoQWXkklyA/TE47YJDLik4MJuX7Gbr3e6z2wnb+gzgDgeawzoHfmtp6t9BW89WdbegqjjscaA3tArLLhyc+vN2WrLl2QhvaB9CFPHY40B6iqnrnRKUPHOXZl/vPTz+Bd2u5XWE6vzGqojHmsMUFQvNb9F/4eHMyntL2LU8VhlQK/y1JFWfVUNQsXK7HT3ZzoqX3c81hkQNzowwIMBpqtQ4ASYT4RACzKfDGGAmAGZK2YA46EEw6FzAAO42YKBARwGxLplOZgBIQwwXYUMJ8B8IhhakPlkMAO0bgZkg1fnkln+PAwIYABOAEcLkmhBmAESQzjAEMYtiOMaKnENteCFh1lK617E4kYHBoQwwHQVMpwAe3c7WeyCYAC2oQG2oRItCN8DJL4HBBjC+CIW4IuYxDUUqwiJVQQ3/xaLXRCffGIZx2GA1UM1i10QDMAuKMAuSKIFYRcksQsKMISxCwqwC5K4hmIXJPEmzM2vEbCK4OYTiF0Qn2yOfRlX42HbtCg2KayH3ykMODIujE8Ga7w5/j9dXKuHK6aFscnhs/Eb0GjMsXrzxAJx0nJ2qvzrLYcCjDfXLBAobabqFA4VqtXqFOPNbdMimaWs8bCkckRmwF8mZNVRMy2Y2cOOqnzy5P87E2r1cFlN/BoPoxhWe6S0Mx4ufTo+Hv+/LAEAAAAAAAAAAAAAAACcq4YfG1urW3Hy6kAAAAAASUVORK5CYII="
                ></img>
                {item.year}
              </div>
            );
          })}
        </div>
        {data?.map((item, index) => {
          // console.log(item);
          return (
            <div
              key={index}
              className={`${selectedYear == item.year ? "" : "hidden"}`}
            >
              <div className="flex flex-wrap gap-2 ">
                {selectedQuarter
                  ? selectedQuarter.ratingMonth.map((quarter, ind) => {
                      return (
                        <Folder
                          index={ind}
                          key={ind}
                          item={quarter}
                          setExpandKey={setExpandKey}
                          expandKey={expandKey}
                          trigger={trigger}
                          setTrigger={setTrigger}
                        />
                      );
                    })
                  : item.ratingQuarter.map((quarter, ind) => {
                      // recalldata(quarter);
                      return (
                        <div
                          onClick={() => {
                            setSelectedQuarter(quarter);
                            setQuarterName(quarter.quarter);
                          }}
                          key={ind}
                          className={`body-folder2`}
                        >
                          <div className="folder2">
                            <div className="paper one"></div>
                            <div className="paper two"></div>
                            <div className="paper three"></div>
                            <div className="paper four"></div>
                          </div>
                          <div className="text-white absolute bottom-5 left-14 text-[14px] select-none">
                            {quarter.quarter}
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RatingBoard;
