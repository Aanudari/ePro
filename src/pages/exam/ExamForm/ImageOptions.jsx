import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'noImage', label: 'Зураггүй' },
  { value: 'image', label: 'Зурагтай' },
];


export default function ImageOption({ setImageValue}) {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div className="mb-5 w-full md:w-1/3">
      <Select
        placeholder="Зурагны цэс"
        defaultValue={options[0]}
        onChange={setImageValue}
        options={options}
        className="outline-none"
        classNamePrefix="!outline-none !hover:bg-red-100"
      />
    </div>
  );
}