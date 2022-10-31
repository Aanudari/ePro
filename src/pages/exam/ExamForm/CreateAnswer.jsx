import { useState } from "react";

function CreateAnswer({index}) {
    const handleRadio = (value) => {
        console.log(value)
    }
    const [value, setValue] = useState(0);
    // console.log(index)
    console.log(value)
    return ( 
        <div className="group2 md:ml-4">
                                <input 
                                className=''
                                type="radio" 
                                value={index} 
                                checked={index === value}
                                onChange={(event) => {
                                    handleRadio(event.target.value)
                                    setValue(index)
                                }} />
                                <input 
                                type="text"  />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Хариулт {index + 1} :</label>
                            </div>
     );
}

export default CreateAnswer;