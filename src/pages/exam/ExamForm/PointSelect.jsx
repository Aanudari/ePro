import React, { useState } from 'react';
import { useEffect } from 'react';
import Select from 'react-select';

const options = [
  { value: 'auto', label: 'Автоматаар үүсгэх' },
  { value: 'fixed', label: 'Тохируулах' },
];


export default function PointSelect({setPointStatus, unit, handleDeviceId}) {
  const [selectedOption, setSelectedOption] = useState(null);
  let arr = []
  for (let index = 0; index < unit?.length; index++) {
    const element = unit[index];
    arr.push({
      value : element.deviceId,
      label : element.username
    })
  }
  useEffect(() => {
    handleDeviceId(selectedOption)
  }, [selectedOption])
  return (
    <div className="App">
      <Select
        placeholder="Ажилтан сонгох"
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