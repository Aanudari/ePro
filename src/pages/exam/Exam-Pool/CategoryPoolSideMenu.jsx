import React, {useEffect, useState} from 'react';
import {useMutation} from 'react-query';
import {addCategoryPool} from "../../../service/examService"

function CategoryPoolSideMenu({ showSideMenu, setShowSideMenu }) {
    
    const [inputValue, setInputValue] = useState({name : ""});
    const [trigger, setTrigger] = useState(false);
    const { mutate, isLoading } = useMutation(addCategoryPool, {
        onSuccess: data => {
          setTrigger(!trigger)
        },
        onError: () => {
          alert("there was an error")
        },
      });
    const handleAddCategoryPool = () => {
        mutate(inputValue)
    }
    
    return (
        <div className={`fixed top-[56px] right-0 w-[500px] min-h-screen bg-red-100
        glass2 ${showSideMenu ? `appearPoolMenu` : `disappearPoolMenu hidden`}
        `}><button onClick={() => {
                setShowSideMenu(!showSideMenu)
            }} className="px-3 py-2 border">close </button>
            <div className="w-full">
                <input onChange={(value) => {
                    setInputValue({name : `${value.target.value}`})
                }} type="text" className="input-cus focus:outline-none bg-gray-300 h-10" />
                <button onClick={handleAddCategoryPool} className="px-3 py-2 border hover:bg-white">Add Category</button>
            </div>
            </div>
    );
}

export default CategoryPoolSideMenu;