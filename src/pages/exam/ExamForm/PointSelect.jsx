import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'auto', label: 'Автоматаар үүсгэх' },
  { value: 'fixed', label: 'Тохируулах' },
];


export default function PointSelect() {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div className="App">
      <Select
        defaultValue={options[0]}
        onChange={setSelectedOption}
        options={options}
        className="outline-none"
        classNamePrefix="!outline-none !hover:bg-red-100"
      />
    </div>
  );
}