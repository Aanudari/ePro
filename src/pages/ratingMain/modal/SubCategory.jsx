import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";

function SubCategory({ setIds, it, ids }) {
    const { TOKEN } = useStateContext();
    const deleteSubCategory = () => {
        axios({
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": TOKEN
            },
            url: `${process.env.REACT_APP_URL}/v1/Category/sub/${it.id}`,
        })
            .then((res) => {
                setIds([])
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className=" flex justify-between py-3 parent border-b mb-1 items-center">
            <span className=" font-[500] text-[13px]">{it.name}</span>
            <div className="flex gap-2 min-w-[90px] items-center">
                <span className=" font-[500] text-[13px]">{it.maxPoints}<i className="bi bi-percent"></i></span>
                <i onClick={deleteSubCategory} className={`bi bi-trash3-fill ml-1 text-md text-red-500 
            ${ids.includes(it.id && "!hidden")} hover:text-red-600 cursor-pointer child hidden`}></i>
            </div>
        </div>
    );
}

export default SubCategory;