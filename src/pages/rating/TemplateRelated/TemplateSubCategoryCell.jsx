function TemplateSubCategoryCell({
  element,
  dataBuffer,
  setDataBuffer,
  item,
  newDataBuffer,
  setIsChanged,
  givenSubCategoryId
}) {

  function handleTextInput(event) {

    const category = newDataBuffer.find(
      (category) => category.categoryId === item.categoryId
    );

    const subcategory = category.subCategories.find(
      (subcategory) => subcategory.subcategoryId === element.subcategoryId
    );
    subcategory.subcategoryName = event.target.innerText + ' '; //null handling using this nbsq

    console.log("our ITEM is :" + JSON.stringify(item) + "\nour ELEMENT is:" + JSON.stringify(element) +"\n");
    console.log("our new data buffer is:" + JSON.stringify(newDataBuffer));

    setIsChanged(true);
  }

  function handleNumberInput(event) {

    const category = newDataBuffer.find(
      (category) => category.categoryId === item.categoryId
    );

    const subcategory = category.subCategories.find(
      (subcategory) => subcategory.subcategoryId === element.subcategoryId
    );

    subcategory.subcategoryPoint = event.target.innerText + ' '; //null handling using this nbsq
    
    setIsChanged(true);
  }

  return (
    <>
      <div className="border py-1 px-2 flex justify-between items-center bg-white rounded mt-[2px]">
        <div
          className="text-[13px] font-[400] w-[calc(90%)]"
          suppressContentEditableWarning="true"
          contentEditable="true"
          onInput={handleTextInput}
        >
          {" "}
          {element.subcategoryName}
        </div>
        <div className="h-full flex items-start">
          <div className="flex bg-[#50a3a2] p-2 rounded text-white w-[calc(40px)]">
            {" "}
            <div
              onInput={handleNumberInput}
              suppressContentEditableWarning="true"
              contentEditable="true"
            >
              {" "}
              {element.subcategoryPoint}{" "}
            </div>{" "}
            %
          </div>{" "}
        </div>
      </div>
    </>
  );
}

export default TemplateSubCategoryCell;
