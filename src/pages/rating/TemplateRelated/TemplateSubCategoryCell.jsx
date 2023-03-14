function TemplateSubCategoryCell({ element }) {
  return <div className="flex">
            <div className="text-center text-base from-left3 bg-white w-4/5 h-full  flex flex-col justify-between  text-gray-500 px-3 py-1 shadow text-[15px]">{element.subcategoryName}</div> 
            <div className="text-center text-base from-left4 bg-white w-1/5 h-full  flex flex-col justify-between  text-gray-500 px-3 py-1 shadow text-[15px]">{element.subcategoryPoint + "%"}</div> 
         </div>
  

}

export default TemplateSubCategoryCell;
