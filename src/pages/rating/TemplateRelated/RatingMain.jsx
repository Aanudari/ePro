import RatingBoard from "../controllers/RatingBoard";
import RatingController from "../controllers/RatingController";
import { useState, useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import { logout } from "../../../service/examService";
import RatingSearchModal from "../modal/RatingSearchModal";
import bg from "../../../assets/bg.jpg";
import Loading from "../../../components/Loading";
import ExcelSearchModal from "../modal/ExcelSearchModal";
function RatingMain() {
  const [showModal, setShowModal] = useState(false);
  const { TOKEN } = useStateContext();
  const [data, setData] = useState();
  const [trigger, setTrigger] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/getListRating`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          setData(res.data.ratingYear);
          setLoading(false);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [trigger]);
  // console.log(data);
  return (
    <div
      style={{ background: `url(${bg})` }}
      className="w-full  h-[calc(100vh-112px)] p-3 flex gap-2 transition-all relative "
    >
      {loading && <Loading />}
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
        // <ExcelSar  />
        <ExcelSearchModal data={data} setShowSearch={setShowSearch} />
      )}
    </div>
  );
}

export default RatingMain;
