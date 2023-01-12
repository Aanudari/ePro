function AnswerCellMain({ index, handleChecked, checked, handleValues }) {
  return (
    <div className="w-full relative pl-10">
      <div className="group !w-full pr-4">
        <input
          onChange={(e) => {
            handleValues(e.target.value, index);
          }}
          className={
            "custom-validation !w-[calc(70%)] !border-b-[2px] !border-[#50a3a2] font-[400]"
          }
          type="text"
          required
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label className="">Хариулт {index + 1}</label>
      </div>
      <div
        onClick={() => {
          handleChecked(index);
        }}
        className="z-10 absolute left-[10px] top-[15px] w-[25px] h-[25px] rounded-lg border-[2px] 
            cursor-pointer "
      >
        {checked.includes(index) && (
          <i className="bi bi-check-lg text-2xl absolute top-[-6px] left-[-2px] text-[#50a3a2]"></i>
        )}
      </div>
    </div>
  );
}

export default AnswerCellMain;
