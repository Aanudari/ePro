import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
function ShowSubCategory({ setIds, it, ids }) {
  const { TOKEN } = useStateContext();
  const deleteSubCategory = () => {
    axios({
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/Category/sub/${it.id}`,
    })
      .then((res) => {
        setIds([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-between py-3 text-black border-b mb-1 items-center">
      <span className=" font-[500] text-[13px]">{it.name}</span>
      <div className="flex gap-2 items-center">
        <span className=" font-[500] text-[13px]">
          {it.points}
          <i className="bi bi-percent"></i>
        </span>
      </div>
    </div>
  );
}

export default ShowSubCategory;
