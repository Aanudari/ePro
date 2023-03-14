import { useEffect, useState } from "react";
import CreateRatingModal from "../modal/CreateRatingModal";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { logout } from "../../../service/examService";
import RatingBlock from "../TemplateRelated/RatingBlock";
import moment from "moment";
function RatingBoard({ showModal, setShowModal }) {
  const { TOKEN } = useStateContext();
  const [data, setData] = useState();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/getListRating`,
    })
      .then((res) => {
        if (res.data.isSuccess == true) {
          setData(res.data.ratings);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // create an object for each month, with an empty array as the value
  const months = {};
  let date = "01/11/1992"; // string
  for (let i = 0; i < 12; i++) {
    const month = moment(new Date(date)).month(i).format("MMMM");
    const year = moment(new Date(date)).year(2023).month(i).format("YYYY");
    months[`${month} ${year}`] = [];
  }

  // loop through the original data and add each item to the corresponding month's array
  // for (const item of data2) {
  //   const monthYear = moment(item.createdDate).format("MMMM YYYY");
  //   months[monthYear].push(item);
  // }
  for (let index = 0; index < data?.length; index++) {
    const element = data[index];
    const monthYear = moment(element.createdDate).format("MMMM YYYY");
    months[monthYear].push(element);
  }

  // convert the object to an array of 12 objects
  const result = Object.entries(months).map(([monthYear, items]) => ({
    monthYear,
    items,
  }));

  return (
    <div className="w-[calc(90%)] bg-white h-full rounded shadow shadow-inner">
      {showModal && <CreateRatingModal setShowModal={setShowModal} />}
      <div className="p-3 h-full w-full rounded">
        {result.map((month, ind) => {
          return (
            <div key={ind} className="w-full">
              {month.items.length > 0 && (
                <div className="text-gray-500 text-[13px] px-2 py-1 rounded bg-gray-300 w-[100px] font-[400] mb-1 text-gray-500">
                  {month.monthYear}
                </div>
              )}
              <div>
                {month.items.map((item, index) => {
                  return (
                    <RatingBlock
                      item={item}
                      key={JSON.stringify(item + index)}
                    />
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
