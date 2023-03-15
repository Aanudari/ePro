function SelectSubCategoryCell({ i, element }) {
  const container = [
    {
      value: 0,
      point: 0,
    },
  ];
  for (let index = 0; index < parseInt(element.subCatMaxScore); index++) {
    const arr = {
      value: index + 1,
      point: index + 1,
    };
    container.push(arr);
  }
  return (
    <div
      key={i}
      className="border py-1 px-2 flex justify-between items-center bg-white rounded mt-[2px]"
    >
      <div className="text-[13px] font-[400] w-[calc(90%)] ">
        {element.subCategoryName}
      </div>
      <div className="h-full flex items-start">
        <select name="" id="" className="w-[80px] ">
          {container.map((item, index) => {
            return (
              <option value={`${item.value}`} className={""}>
                {item.point}
              </option>
            );
          })}
        </select>
        {/* <input
            type="text"
            className="w-[calc(30px)] text-center text-[13px]"
          /> */}
        {/* <span className="text-[13px]">%</span> */}
      </div>
    </div>
  );
}

export default SelectSubCategoryCell;
