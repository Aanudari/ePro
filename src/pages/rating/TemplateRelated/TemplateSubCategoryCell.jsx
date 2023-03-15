function TemplateSubCategoryCell({ element }) {

  return <div className="border py-1 px-2 flex justify-between items-center bg-white rounded mt-[2px]">
            <div className="text-[13px] font-[400] w-[calc(90%)]">{element.subcategoryName}</div> 
            <div className="h-full flex items-start"><div className="bg-[#50a3a2] p-2 rounded text-white"> {element.subcategoryPoint + "%"} </div></div> 
         </div>


}  

export default TemplateSubCategoryCell;
