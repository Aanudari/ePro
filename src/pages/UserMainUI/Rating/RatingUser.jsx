import UserLayout from "../../../components/UserLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import { logout } from "../../../service/examService";
import { useStateContext } from "../../../contexts/ContextProvider";
import RatingBlockUser from "./Cells/RatingBlockUser";
function RatingUser() {
  const [trigger, setTrigger] = useState(false);
  const [data, setData] = useState([]);
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
        if (res.data.isSuccess === true) {
          setData(res.data.ratingYear);
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
          <div className="content py-2">
            <div className="content-main">
              <div className="card-grid">
                {data?.length > 0 ? (
                  data?.map((element, index) => {
                    return (
                      <div key={index}>
                        {/* <div>{element.year}</div> */}
                        <div>
                          {element.ratingQuarter.map((itemX, ind) => {
                            return (
                              <div key={ind}>
                                {/* <div>{itemX.quarter}</div> */}
                                <div>
                                  {itemX.ratingMonth.map((el, indexX) => {
                                    return (
                                      <div key={indexX}>
                                        {/* <div>{el.month}</div> */}
                                        <div>
                                          {el.ratings.map((item, indexY) => {
                                            return (
                                              <RatingBlockUser
                                                key={indexY}
                                                item={item}
                                              />
                                            );
                                          })}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="w-[300px] md:w-[500px]">
                    <img src="notfound.webp" alt="" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </UserLayout>
  );
}

export default RatingUser;
