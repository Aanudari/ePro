import { useStateContext } from "../../../contexts/ContextProvider";
import ModalShow from "./ModalShow";

function EditCategoryModal({ close, categories, index, trigger, setTrigger }) {
  const { activeMenu } = useStateContext();
  const filtered = categories.filter((item, i) => {
    return item.id === index;
  });
  const cat = filtered[0];
  return (
    <div
      className={`fixed ${
        activeMenu ? "w-[calc(100%-250px)] left-[250px]" : "w-full left-0"
      }  
     !bg-black top-[56px] h-[calc(100%-56px)] !bg-opacity-50  flex justify-center items-center z-20`}
    >
      <div className="p-3 bg-gray-100 rounded-lg ">
        <div className="bg-white rounded-lg px-2 md:px-10 pt-3">
          <div className="flex flex-col items-center justify-center">
            <ModalShow
              cat={cat}
              close={close}
              trigger={trigger}
              setTrigger={setTrigger}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCategoryModal;
