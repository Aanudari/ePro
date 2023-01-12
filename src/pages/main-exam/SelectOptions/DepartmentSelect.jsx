import React, { useState, useEffect } from "react";
import Select from "react-select";
const options = [
  { value: "auto", label: "Автоматаар үүсгэх" },
  { value: "fixed", label: "Тохируулах" },
];
function DepartmentSelect({ data, handleOptions }) {
  let arr = [];
  for (let index = 0; index < data?.length; index++) {
    const element = data[index];
    arr.push({
      value: element.id,
      label: element.name,
    });
  }
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    handleOptions(selectedOption?.value);
  }, [selectedOption]);
  return (
    <div className="App z-10">
      <Select
        placeholder="Алба сонгох"
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={arr}
        className="outline-none"
        classNamePrefix="!outline-none !hover:bg-red-100"
        noOptionsMessage={({ inputValue }) =>
          !inputValue && "Сонголт хоосон байна"
        }
      />
    </div>
  );
}

export default DepartmentSelect;
