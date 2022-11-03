import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: '188', label: 'Branch' },
  { value: '208', label: 'Installer' },
  { value: '1', label: 'Level 1' },
  { value: '7', label: 'Bank' },
  { value: '3', label: 'Care' },
  { value: '168', label: 'Telesales' },
  { value: '4', label: 'Complain' },
  { value: '5', label: 'Online' },
];


export default function OptionSelect() {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div className="App">
      <Select
        placeholder="Ажлын байр"
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        isMulti='true'
        className="outline-none"
        classNamePrefix="!outline-none !hover:bg-red-100"
        noOptionsMessage={({inputValue}) => !inputValue && "Сонголт хоосон байна"} 
      />
    </div>
  );
}