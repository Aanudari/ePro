import CreateRatingModal from "../modal/CreateRatingModal";
import Folder from "../Folder";
import { useState } from "react";
import { useEffect } from "react";
function RatingBoard({ showModal, setShowModal, data, setTrigger, trigger }) {
  const [expandKey, setExpandKey] = useState(0);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const [quarterName, setQuarterName] = useState("");
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
      <div className="w-full h-[calc(100vh-160px)] overflow-scroll py-2 flex flex-col gap-2 select-none">
        <div className="w-full p-2 rounded bg-teal-500 flex items-center justify-end relative gap-2">
          <span className="absolute left-10 text-white text-[15px] font-[500] flex items-center select-none">
            {selectedQuarter != "" && quarterName != "" ? (
              <button
                className="bg-white w-6 rounded-full active:scale-105  text-gray-800 text-[13px] mr-2"
                onClick={() => {
                  setSelectedQuarter("");
                  setQuarterName("");
                }}
              >
                <img
                  className="w-6"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAABDCAYAAADHyrhzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGAklEQVR4nO1ba2xUVRA+FY0xKAoaNCi+H9jdcy61WoiPYNToH/xhTNVEMf4RH6S7M3dBqhEbIr5++AvBGI2vmCANRo0/VEwkCpb2ntm2FBU0EUWiIKJGoBEfsGbuUtp0b3fv49x7t8qXTDbb9J4z8+2cc+bMzBXiKI4idciB9smK8rOUxrsV4WOK8Bml8QVJ8Bp/ut/57w7MszS2WH35U8R/BZdsWHSSJLtVEj6vCLcqwlJwgS2SYCWPw+OJcYWSaFCUv0lpfEMSDoYjwFukhv08rkVwI88j6haljmNUEW5WGsgkAWMSQ7CZl9ucdR3HinqCdOAGduckSKgQjV8qguvS5kBkN+ZOlxreTIWESk9ZpfoLU1MhwtL5a6WGH9ImYdSe8pO7nyQJqfFRpeFg2sZ7ewj+IwkeiZ2E1s7WCYePyVLdi4YVvKnHR4TG1akbGWjZ4GrW2ywTJdEgCV5K27hQhBC+bjQmkRqeTNuoaAKPGyFCkT1XaTyUvkERROMhi/CWSEQ0Uu5sRfBL6sYYEKnxN9VdOC/8HUPjJ8aVIvhZESxRGu6XGncnSgjhulD7hypfsw0rBJ3NZJ82NIck+56kPcQq4l2BiGimxScrwl0GldijHLxj9DzZIlyeNBmKYGdLd9sk/15BsMSYa2p43+rDM73mSYcMd6n6i1BVf2GiibUsCX+XRZhfba60yGBPbfz8wRN9eAXmDLji2oxjT681lySUTFoqhGhoq0mGJOwLPwHuU2Q/EHTHntGz4NSZTu4KS+N9fBVPgiBJ0Fvzl1LhifhUOnC+MIDZXXiCRXCb0rAxTkKsHsiMqYTS+ESIJfGH0rYd1w2Rs1iKYCDxMF0Sdgdcd38qsq8WMaOZ5h+nCB8uz2eQDA0bPSds6W6bJAn+DrTuNL4lEgQTz3GCKTLYXs/yg+L0ftDBNLwnEobsbjtLavjC2L7hlSaUhBDCzQ5yeSBpQhp7Fp4RvihV4R15DzJgZficIz514ddtxydJCEe1UuO3BvaNFRWDK4K1ERneLAkuS5IQWSw0u6dZJL3xw8qBCZ3oLod/KYIO3v19GTPQPjnTi1aUY1lqXBxRZ6diUGWyIqaBqgY0lXeTXVLDy7JoXx/u2I2iO2zxIAN3GCPDJQQPSA0PVctOe13UyssN7+Uo1C8hnKOIoOuOigElwTajZAyT0qV67Iv9kjFSySzBnX7uOewdXE0LqeM3FQMqjZtiIaO8Lrk1ITfaMD9XeM6H8FFaixBFsDzkj7XJwzNwQ1xkjFgCH1t9+XNHeOMCX89p3G1puKoqGQ7eGlKn9V7MdsZNxpCXuJ04GpYqgr2+n9Own4/Sah0BofTRuNqLjGVJkBHRs76qFtyFC8I8bq7KgXlpG+tT+Y4xlwrBZ0HHczfpSjJy2fQN9eMdOMiZMW8y8J2g43nHQyXREOF4Sto72j3J0PBKwHF2jnl0yzppSarpHRq+8zLCbWUK5GWwKq5IrpSs5GdVLhN4N/J+cWSw/sLEcoY7bUP9CDwdbQOFvWzvmGQwuLkjfUNrC+drxSgELH69KmrB0tiStqG+ROOBkTFHYxdOCfI812mEHyjCj8aJd8we1tme6/s5jR8Iv8g6OGd8kDGcv5QEz/p/NmB5QxKsSdtYH/Likb51wu3+noFOERQZx57udvGnb3DNIhDXaP39P+7jUkNgMhjshqkbXEMkQU8592qo8l793RF8O22DjZDGBa+o/aCNXTjFSH0iXe/Zxpl4YQIze3MXjZ9LXIXsyZI9wwgRQ+AgZfyE6kMegYMZx75SxAFF+VnlPs70Da0pGn6VBNeIODGzt9CoCL6vc4/40a3UJQHVX5jKNco6JWJdU3HRNJEkWt33T2Bp0AaX+EhgPaDD/PslAZAt5lQSNZcaRKxnPURdoCQaOLvOqfyEidjqtwSZOFo7Wydwj7iJ9oYantCjivbtsb2DZhqZYv7Sw62URtqNym0HsMx4AJU0moqLprnJZo3PHU4cbR/z7SaNhzj7Xe4kguX8XOKnQ+LgOs1A++SmYuGcDC28gD/d+0M9rn/xP8S/Tgr52LkJ60IAAAAASUVORK5CYII="
                />
              </button>
            ) : (
              <button
                className="bg-white w-6 rounded-full active:scale-105  text-gray-800 text-[13px] mr-2"
                onClick={() => {
                  setSelectedQuarter("");
                  setQuarterName("");
                }}
              >
                <img
                  className="w-6"
                  src="data:image/png;base64,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"
                />
              </button>
            )}
            / {selectedYear} / {quarterName}
          </span>
          {data?.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedYear(item.year);
                  setSelectedQuarter("");
                  setQuarterName("");
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
