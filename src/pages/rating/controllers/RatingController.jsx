import excel from "../../../assets/excel.svg";

function RatingController({ setShowModal, data, setShowSearch }) {
  return (
    <div
      className="w-[calc(100px)] h-[calc(100vh-140px)] ml-2 glass shadow-sm rounded-md
        p-3 flex flex-col justify-between"
    >
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="w-full py-1 rounded-full hover:scale-105 transition-all"
      >
        <img src="data:image/png;base64,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"></img>
      </button>
      <button
        onClick={() => {
          setShowSearch(true);
        }}
        className="px-2 py-1 rounded"
      >
        <img
          src={`${excel}`}
          className="hover:scale-105 w-20 transition-all"
          alt=""
        />
      </button>
    </div>
  );
}

export default RatingController;
