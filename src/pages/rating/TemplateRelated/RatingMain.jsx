import RatingBoard from "../controllers/RatingBoard";
import RatingController from "../controllers/RatingController";
import { useState, useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import { logout } from "../../../service/examService";
import RatingSearchModal from "../modal/RatingSearchModal";
function RatingMain() {
  const [showModal, setShowModal] = useState(false);
  const { TOKEN } = useStateContext();
  const [data, setData] = useState();
  const [trigger, setTrigger] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/getListRating`,
    })
      .then((res) => {
        if (res.data.isSuccess == true) {
          setData(res.data.ratings);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [trigger]);
  // console.log(data);
  return (
    <div className="w-full h-[calc(100vh-112px)] bg-teal-500 p-3 flex gap-2 transition-all">
      <RatingBoard
        showModal={showModal}
        setShowModal={setShowModal}
        trigger={trigger}
        setTrigger={setTrigger}
        data={data}
        setShowSearch={setShowSearch}
      />
      <RatingController
        setShowModal={setShowModal}
        setShowSearch={setShowSearch}
      />
      {showSearch && (
        <RatingSearchModal data={data} setShowSearch={setShowSearch} />
      )}
    </div>
  );
}

export default RatingMain;
