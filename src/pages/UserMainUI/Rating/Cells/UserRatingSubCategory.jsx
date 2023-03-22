function UserRatingSubCategory({ sub }) {
  //   console.log(sub);
  return (
    <div className="inset-shadow px-3 py-2 mt-1 rounded flex justify-between items-center">
      <div className="text-gray-600 font-[400] text-[14px]">
        {sub.subCategoryName}
      </div>
      <div className="flex bg-gray-400 py-1 px-2 rounded min-w-[52px] ml-2">
        <div className="text-gray-100 font-[400] text-[14px]">
          {sub.subCatUserScore}/
        </div>
        <div className="text-gray-100 font-[400] text-[14px]">
          {sub.subCatMaxScore}
        </div>
      </div>
    </div>
  );
}

export default UserRatingSubCategory;
