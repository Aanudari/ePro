import { useStateContext } from "../../../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
function RatingBlockUser({ item }) {
  const { deviceId } = useStateContext();
  const navigate = useNavigate();
  // console.log(item);
  return (
    <article className="card !border-none select-none ">
      <div className="card-header !border-none">
        <div className="overflow-hidden min-w-[250px] h-[60px] flex justify-start">
          <span>
            <img src="https://feweek.co.uk/wp-content/uploads/2020/12/exams-covid-summer-plans-feat-1000x525.jpg" />
          </span>
          <div className="flex flex-col ml-2 w-full !items-start ">
            <h3 className="text-[14px] uppercase m-0">{item.ratingName}</h3>
            <h3 className="text-[14px] uppercase mx-0 mt-1">
              {item.createdDate}
            </h3>
          </div>
        </div>
        <div className="w-full text-[500] text-[12px] h-full flex justify-end items-end">
          <h3 className="text-[14px] uppercase mt-[8px]">
            {item.userInfo.score}%
          </h3>
        </div>
      </div>

      <div className="card-footer !flex !justify-between !border-none">
        <a className="!text-[14px] cursor-auto">
          Үнэлгээ үүсгэсэн: {item.createdBy}
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
          className="cursor-pointer !text-[14px] hover:!text-indigo-700 !font-[500] rounded border px-3 py-1 hover:!border-indigo-700"
        >
          Дэлгэрэнгүй
        </a>
      </div>
    </article>
  );
}

export default RatingBlockUser;
