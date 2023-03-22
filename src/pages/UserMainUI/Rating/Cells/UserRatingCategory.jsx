import UserRatingSubCategory from "./UserRatingSubCategory";

function UserRatingCategory({ category }) {
  return (
    <div className="bg-[#ecf0f3] rounded-[20px] p-4 mt-4 shadow-md">
      <div className="flex justify-between">
        <h6 className="mt-2">{category.categoryName}</h6>
        <div className="flex">
          <h6 className="m-0">{category.catUserScore}</h6>/
          <h6 className="m-0">{category.catMaxScore}</h6>
        </div>
      </div>
      {category.subCategories.map((sub, index) => {
        return <UserRatingSubCategory sub={sub} key={index} />;
      })}
    </div>
  );
}

export default UserRatingCategory;
