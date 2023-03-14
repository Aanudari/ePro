function RatingBlock({ item }) {
  //   console.log(item);
  return (
    <div
      className="rounded  py-3 px-4 text-[13px]  text-white bg-teal-500 hover:bg-teal-600 
    transition-all mb-2 w-full flex justify-between"
    >
      <div>
        <div className="font-[400]">{item.ratingName}</div>
        <div className="font-[400]">{item.createdBy}</div>
      </div>
      <div className="font-[400]">{item.ratingName}</div>
      <div className="font-[400]">{item.ratingName}</div>
    </div>
  );
}

export default RatingBlock;
