import CreateRatingModal from "../modal/CreateRatingModal";

function RatingBoard({ showModal, setShowModal }) {
  return (
    <div className="w-[calc(90%)] bg-white h-full rounded shadow shadow-inner">
      {showModal && <CreateRatingModal setShowModal={setShowModal} />}
    </div>
  );
}

export default RatingBoard;
