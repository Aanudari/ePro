function EditQuestionMain({ question, imgSide, setImgSide }) {
  return (
    <div className="h-full w-full px-4 flex flex-col gap-4 pt-4 drop-smooth overflow-scroll bg-white rounded ">
      <div className="flex justify-between w-full items-center">
        <h6 className="text-[13px] m-0">Оноо: {question.points}</h6>
        <i
          onClick={() => {
            setImgSide(!imgSide);
          }}
          className="bi bi-image cursor-pointer text-2xl text-gray-600"
        ></i>
      </div>
      {question.qimgUrl !== "" && (
        <div className="w-full justify-center flex">
          <img
            src={`http://${question.qimgUrl}`}
            alt="test"
            className="h-[250px] w-full"
          />
        </div>
      )}
      {question?.answers?.map((item, index) => (
        <div
          key={index}
          className="w-full border-b border-gray-400 pb-1 flex justify-between appear-smooth font-[500]
                    text-[13px]"
        >
          {item.answer}
          {item.isTrue === "1" && (
            <i className="bi bi-check-circle text-green-500 text-xl !mb-0"></i>
          )}
        </div>
      ))}
    </div>
  );
}

export default EditQuestionMain;
