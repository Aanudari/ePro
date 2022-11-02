import { useState } from "react";

function CreateAnswer({ index, value, setValue, handleStore, handleRadio, setnoti_store }) {
    const [radioSelected, setRadioSelected] = useState(0);
    // console.log(radioSelected)
    return (
        <div className="group2 md:ml-4 relative">
            <input
                className='radio-input'
                type="radio"
                value={index}
                checked={index === value}
                onChange={(event) => {
                    setRadioSelected(event.target.value)
                    setValue(index)
                    handleRadio(event.target.value)
                }} />
            <input
            onChange={(event) => {
                handleStore(event.target.value, index, radioSelected)
            }}
                type="text" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Хариулт {index + 1} :</label>
        </div>
    );
}

export default CreateAnswer;