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

  /*adding a subcategory blank with the plus button */
  const newSubCategory = {
    "subcategoryId": givenSubCategoryId,
    "subcategoryName": " ",
    "subcategoryPoint": " "
  };
  console.log("the push doesn't work so here's to see newDatabuffer" + newDataBuffer.categoryId + "\n");
  newDataBuffer[0].subCategories.push(newSubCategory);
  setIsChanged(true);
  //newDataBuffer.subCategories.push(newSubCategory);
  /*END adding a subcategory blank with the plus button */

    /* JSON.stringify(item) + "something"; */
/*     const subcategory = item.find(
      (category) => category.subcategoryId === catId
    );
 */
    function handleTextInput(event) {

      const category = newDataBuffer.find(
        (category) => category.categoryId === catId
      );
  
      const subcategory = category.subCategories.find(
        (subcategory) => subcategory.subcategoryId === givenSubCategoryId
      );
      subcategory.subcategoryName = event.target.innerText + ' '; //null handling using this nbsq
  
      console.log("our ITEM is :" + JSON.stringify(item) + "\nour ELEMENT is:" + JSON.stringify(element) +"\n");
      console.log("our new data buffer is:" + JSON.stringify(newDataBuffer));
  
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
    <div className="border py-1 px-2 flex justify-between items-center bg-white rounded mt-[2px]">
      <div
        className="text-[13px] font-[400] w-[calc(90%)]"
        suppressContentEditableWarning="true"
        contentEditable="true"
        onInput={handleTextInput}
      >
       {"adee"} {/* text input */}
      </div>
      <div className="h-full flex items-start">
        <div className="flex bg-[#50a3a2] p-2 rounded text-white w-[calc(40px)]">
          {" "}
          <div
            suppressContentEditableWarning="true"
            contentEditable="true"
            onInput={handleNumberInput}
          >
            
          {"0"} {/* percentage input */}
            
          </div>{" "}
          %
        </div>{" "}
      </div>
    </div>
  </>
)

} 

export default NewTemplateSubCategoryCell;