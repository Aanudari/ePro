import UserLayout from "../../../components/UserLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import { logout } from "../../../service/examService";
import { useStateContext } from "../../../contexts/ContextProvider";
import RatingBlockUser from "./Cells/RatingBlockUser";
function RatingUser() {
  const [trigger, setTrigger] = useState(false);
  const [data, setData] = useState();
  const { TOKEN } = useStateContext();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/getListRating`,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.isSuccess === true) {
          setData(res.data.ratings);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [trigger]);
  return (
    <UserLayout>
      <main className="main">
        <div className="responsive-wrapper">
          <div className="main-header">
            <h1 className="text-[#404089] !text-[22px]">Үнэлгээ</h1>
            <div className="search">
              <input type="text" placeholder="Search" />
              <button type="submit">
                <i className="ph-magnifying-glass-bold"></i>
              </button>
            </div>
          </div>
          <div className="horizontal-tabs">
            <a className="cursor-pointer">Нийт</a>
            <a className="cursor-pointer">Мессеж</a>
            <a className="cursor-pointer">Password</a>
            <a className="cursor-pointer">API</a>
          </div>
          <div className="content py-2">
            <div className="content-main">
              <div className="card-grid">
                {data?.map((item, index) => {
                  return <RatingBlockUser key={index} item={item} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </UserLayout>
  );
}

export default RatingUser;
