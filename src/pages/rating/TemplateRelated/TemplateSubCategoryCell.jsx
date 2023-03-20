function TemplateSubCategoryCell({
  element,
  /* test by mb */ dataBuffer,
  setDataBuffer,
  item,
  newDataBuffer
}) {
  /*test by mb*/
  
  function handleTextInput(event) {
    /* console.log("element is: " + JSON.stringify(element) + "\n"); //element.subcategoryId
        console.log("item is: " + JSON.stringify(item) + "\n")//item.categoryId
        console.log("orj irsen text ni" + JSON.stringify(event.target.innerText) + "\n" + JSON.stringify(dataBuffer) + "\n" + element.categoryId); */
    // find the category with the matching categoryId
    
    const category = newDataBuffer.find(
      (category) => category.categoryId === item.categoryId
    );
    console.log("the category is: " + JSON.stringify(category));
    // find the subcategory with the matching subcategoryId
    const subcategory = category.subCategories.find(
      (subcategory) => subcategory.subcategoryId === element.subcategoryId
    );
    console.log(
      "the subcategory is: " +
        JSON.stringify(subcategory) +
        "and the event.target.value is" +
        event.target.innerText
    );
    subcategory.subcategoryName = event.target.innerText;
    //setDataBuffer(newDataBuffer); //this works.
    console.log("our new data buffer is:" + newDataBuffer);
    console.log("our new data buffer is:" + JSON.stringify(newDataBuffer));
  }

  function handleNumberInput(event) {
    /* console.log("element is: " + JSON.stringify(element) + "\n"); //element.subcategoryId
      console.log("item is: " + JSON.stringify(item) + "\n")//item.categoryId
      console.log("orj irsen text ni" + JSON.stringify(event.target.innerText) + "\n" + JSON.stringify(dataBuffer) + "\n" + element.categoryId); */

    // find the category with the matching categoryId
    const category = newDataBuffer.find(
      (category) => category.categoryId === item.categoryId
    );
    console.log("the category is: " + JSON.stringify(category));
    // find the subcategory with the matching subcategoryId
    const subcategory = category.subCategories.find(
      (subcategory) => subcategory.subcategoryId === element.subcategoryId
    );
    console.log(
      "the subcategory is: " +
        JSON.stringify(subcategory) +
        "and the event.target.value is" +
        event.target.innerText
    );
    subcategory.subcategoryPoint = event.target.innerText;
    //setDataBuffer(newDataBuffer); //this works.
    
  }
  /*test by mb*/
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
