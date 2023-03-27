function RatingController({ setShowModal, data, setShowSearch }) {
  return (
    <div
      className="w-[calc(80px)] h-[calc(100vh-140px)] ml-2 glass shadow-sm rounded-md
        p-3 flex flex-col justify-between"
    >
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="w-full py-1 rounded-full active:bg-gray-300 hover:bg-gray-200 bg-gray-100"
      >
        <i className="bi bi-vector-pen text-xl text-teal-600"></i>
      </button>
      <button
        onClick={() => {
          setShowSearch(true);
        }}
        className="w-full py-1 rounded-full active:bg-gray-300 hover:bg-gray-200 bg-gray-100"
      >
        <i className="bi bi-search text-xl text-teal-600"></i>
      </button>
    </div>
  );
}

export default RatingController;
