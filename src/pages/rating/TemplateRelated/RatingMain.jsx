import RatingBoard from "../controllers/RatingBoard";
import RatingController from "../controllers/RatingController";
import { useState } from "react";

function RatingMain() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full h-full bg-teal-500 p-3 flex gap-2 transition-all">
      <RatingBoard showModal={showModal} setShowModal={setShowModal} />
      <RatingController setShowModal={setShowModal} />
    </div>
  );
}

export default RatingMain;
