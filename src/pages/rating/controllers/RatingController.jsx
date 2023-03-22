function RatingController({ setShowModal, data, setShowSearch }) {
  return (
    <div
      className="max-w-[calc(9%)] min-w-[calc(9%)] h-[calc(100vh-140px)] ml-2 bg-white shadow-sm rounded-md
        px-4 py-3 flex flex-col justify-between"
    >
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="w-full py-3 rounded-full active:bg-gray-300 hover:bg-gray-200 bg-gray-100"
      >
        <i className="bi bi-vector-pen text-2xl text-teal-600"></i>
      </button>
      <button
        onClick={() => {
          setShowSearch(true);
        }}
        className="w-full py-3 rounded-full active:bg-gray-300 hover:bg-gray-200 bg-gray-100"
      >
        <i className="bi bi-search text-2xl text-teal-600"></i>
      </button>
    </div>
  );
}

export default RatingController;
