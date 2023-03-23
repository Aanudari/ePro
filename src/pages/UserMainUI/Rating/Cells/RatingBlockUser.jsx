import { useStateContext } from "../../../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
function RatingBlockUser({ item }) {
  const { deviceId } = useStateContext();
  const navigate = useNavigate();
  // console.log(item);
  return (
    <article className="card">
      <div className="card-header">
        <div className="overflow-hidden min-w-[250px] h-[40px] flex justify-start">
          <span>
            <img src="https://feweek.co.uk/wp-content/uploads/2020/12/exams-covid-summer-plans-feat-1000x525.jpg" />
          </span>
          <div className="flex flex-col ml-2 w-full ">
            <h3 className="text-[14px] uppercase m-0">{item.ratingName}</h3>
            <h3 className="text-[12px] uppercase m-0">{item.createdDate}</h3>
          </div>
        </div>
        <div className="w-full text-[500] text-[12px] h-full flex justify-end items-end">
          <h3 className="text-[14px] uppercase mb-[18px]">
            {item.userInfo.score}%
          </h3>
        </div>
      </div>

      <div className="card-footer !flex !justify-between">
        <a className="!text-[12px] cursor-auto">
          Үнэлгээ хийсэн: {item.createdBy}
        </a>
        <a
          onClick={() => {
            navigate("/user-rating-detail", {
              state: {
                deviceId: deviceId,
                ratingId: item.ratingId,
                ratedBy: item.createdBy,
                conversationId: item.conversationId,
              },
            });
          }}
          className="cursor-pointer !text-[12px]"
        >
          Дэлгэрэнгүй
        </a>
      </div>
    </article>
  );
}

export default RatingBlockUser;
