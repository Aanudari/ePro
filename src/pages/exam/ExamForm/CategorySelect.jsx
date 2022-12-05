import React, { useState } from 'react';
import {useMutation} from 'react-query';
import {deleteCategoryPool} from "../../../service/examService"
export default function CategoryPoolSelect({options, showSideMenu, setShowSideMenu}) {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const { mutate, isLoading } = useMutation(deleteCategoryPool, {
    onSuccess: data => {
      setShow(false)
      window.location.reload();
    },
    onError: () => {
      alert("there was an error")
    },
  });
const handleDeleteCategoryPool = () => {
    mutate(value)
}
  return (
    <div className="px-[40px] pt-4 relative">
        {
            show && 
        <div className='w-full md:w-[calc(100%-250px)] fixed h-screen bg-black bg-opacity-50
        top-[56px] left-0 md:left-[250px] flex items-center justify-center
        '>
            <div className='w-[300px] md:w-[500px] h-[200px] md:h-[300px] rounded p-3 bg-white shadow'>
                <button onClick={() => {
                    setShow(false)
                }} className='px-3 py-2 border'> Хаах</button>
                <button onClick={handleDeleteCategoryPool} className='px-3 py-2 border ml-2 bg-red-400 text-white'> Устгах</button>
            </div>
        </div>
        }

        <div className='w-full flex justify-between'>
            <span className='font-[500] text-[14px]'>
            Категорууд :
            </span>
            <button onClick={() => {
                setShowSideMenu(!showSideMenu)
            }} className='font-[500] text-[14px] border px-2 py-1 rounded
            bg-red-400
            '>
            <i className="bi bi-plus-circle mr-2"></i>
                <span>
                Категори нэмэх
                </span>
            </button>
        </div>
        <div>
            {
               options ? options?.map((item, index) => (
                    <div 
                    onClick={(e) => {
                        setValue(item.value)
                        setShow(true)
                    }}
                    className='h-20 w-full bg-white text-black mt-2 flex items-center pl-10
                    ' key={index}>{item.label}</div>
                )) : <dviv>1</dviv>
            }
        </div>
    </div>
  );
}