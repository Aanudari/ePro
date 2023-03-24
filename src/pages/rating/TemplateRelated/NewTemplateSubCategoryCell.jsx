import { useMemo, useState } from "react";

function NewTemplateSubCategoryCell({
  catId,
  subcatId,
  element,
  dataBuffer,
  setDataBuffer,
  item,
  newDataBuffer,
  setIsChanged,
  givenSubCategoryId
}){

    
/*    const newSubCategory =
      //"subcategoryId": givenSubCategoryId,
      {
        subcategoryId: givenSubCategoryId,
        subcategoryName: "Энийг оруулах",
        subcategoryPoint: "Дүн",
      }; */
    const newSubCategory = useMemo(
      () => ({
        subcategoryId: givenSubCategoryId,
        subcategoryName: "Энийг оруулах",
        subcategoryPoint: "Дүн",
      }),
      [givenSubCategoryId]
    );
    // const [addData, setAddData] = useState()
    newDataBuffer[0].subCategories.push(newSubCategory); 
    console.log(newDataBuffer[0].subCategories)
    //setIsChanged(true); 

    function handleTextInput(event) {
      const category = newDataBuffer.find(
        (category) => category.categoryId === catId
      );
      const subcategory = category.subCategories.find(
        (subcategory) => subcategory.subcategoryId === givenSubCategoryId
      );
      subcategory.subcategoryName = event.target.innerText + ' '; //null handling using this nbs
      setIsChanged(true);
    }
  
    function handleNumberInput(event) {
  
      const category = newDataBuffer.find(
        (category) => category.categoryId === catId
      );
      const subcategory = category.subCategories.find(
        (subcategory) => subcategory.subcategoryId === givenSubCategoryId
      );
      subcategory.subcategoryPoint = event.target.innerText + ' '; //null handling using this nbsq
      setIsChanged(true);
    }
    
return(
    <>
    <div className="mt-1 py-1 px-2 bg-white hover:bg-gray-100 hover:shadow hover:bg-gray flex justify-between items-center  rounded mt-[2px] ">
      <div
        className="text-[13px] font-[400] w-[calc(90%)] "
        suppressContentEditableWarning="true"
        contentEditable="true"
        onInput={handleTextInput}
      >
        {/* {"Ретурн"} */}
      </div>
      <div className="h-full flex items-start">
        <div className="flex bg-[#50a3a2] p-2 rounded text-white w-[calc(40px)] hover:bg-[#50a3a3] hover:shadow">
          <div
            suppressContentEditableWarning="true"
            contentEditable="true"
            onInput={handleNumberInput}
          >
            {"100"}
            
          </div>
          %
        </div>
        <i 
          className="bi bi-trash text-2xl text-red-200 rounded hover:bg-gray-200 shadow ml-2 hover:text-red-400"
          onClick={(event) => {
            const parentElement = event.target.parentNode;
            const grandparentElement = parentElement.parentNode;
            if (grandparentElement) {
              grandparentElement.remove();
            }
          }}>
          </i>
      </div>
    </div>
  </>
)

} 

export default NewTemplateSubCategoryCell;