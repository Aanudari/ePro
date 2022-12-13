import React, { useState } from 'react';
import { useEffect } from 'react';
import Select from 'react-select';

export default function OptionSelect({optionss, handleSelect}) {
  const [selectedOption, setSelectedOption] = useState(null);
  let arr = []
  for (let index = 0; index < optionss?.length; index++) {
    const element = optionss[index];
    arr.push({
      value : element.id,
      label : element.name
    })
  }
  useEffect(() => {
    handleSelect(selectedOption?.value)
  },[selectedOption])
  // console.log(selectedOption)
  return (
    <div className="App">
      <Select
        placeholder="Хэлтэс сонгох"
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={arr}
        className="outline-none"
        classNamePrefix="!outline-none !hover:bg-red-100"
        noOptionsMessage={({inputValue}) => !inputValue && "Сонголт хоосон байна"} 
      />
    </div>
  );
}