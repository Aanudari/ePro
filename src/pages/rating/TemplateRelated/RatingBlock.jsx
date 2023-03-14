function RatingBlock({ item }) {
  //   console.log(item);
  return (
    <div className="bg-gray-300 w-full my-1 text-gray-600 relative">
      <div className="py-3 px-4 w-full flex justify-between items-start ">
        <div className="font-[500] h-full items-center">
          {item.ratingName}
          <span className="absolute px-2 py-1 text-[11px] rounded bottom-2 left-5 bg-gray-400 text-white font-[400]">
            {item.createdBy}
          </span>
        </div>
        <div className="font-[500]"></div>
        <div className="font-[500] flex flex-col items-end">
          <div className="font-[500] ">Үнэлсэн: {item.adminInfo.ratedUser}</div>
          <div className="font-[500] ">Нийт: {item.adminInfo.totalUser}</div>
        </div>
      </div>
      {/* <div className="w-full flex justify-between items-start h-4 bg-white border-b border-l border-r px-3 flex items-center">
        0%
      </div> */}
    </div>
  );
}

export default RatingBlock;
