import { useEffect } from 'react';
import { useState } from 'react';
import ImageUploader from './../exam/ExamForm/ImageUploader';
import AnswerCellMain from './AnswerCellMain';
function CreateQuestionMain({ setQuestion, question, point, setPoint, setQImgUrl, handleSchema, 
    qImgUrl, handleCreateQuesiton }) {
    const [imageValue, setImageValue] = useState();
    const [length, setLength] = useState();
    const [checked, setChecked] = useState([]);
    const handleAnswers = (value) => {
        setLength(value)
    }
    const obj = {
        "answer": "string",
        "aImgUrl": "string",
        "isTrue": "string"
    }
    let arr = []
    for (let index = 0; index < length; index++) {
        arr.push(obj)
    }
    const [object, setObject] = useState();
    const handleChecked = (value) => {
        checked.length > 0 ? 
            setChecked([value]) : setChecked((prev) => [...prev, value])
    }
    const handleValues = (value, index) => {
        let newObj = {
            value : value,
            index : index
        }
        let final = object?.map((item, index) => {
            return index == newObj.index ? ({...item, answer : newObj.value}) : item
        })
        setObject(final)
    }
    const handleObject = () => {
        setObject(arr)
        // console.log(object)
    }
    useEffect(() => {
        handleCreateQuesiton(object, checked[0])
    }, [checked, object])
    useEffect(() => {
        handleObject()
    }, [length])
    return (
        <div className="w-full h-full pt-4 overflow-scroll px-4">
            <div className="w-full h-full">
                <div className="group w-full">
                    <input
                        className={'custom-validation !w-full !border-b-[2px] !border-[#50a3a2] font-[400]'}
                        type="text" onChange={(e) => {
                            handleSchema(e.target.value, point, qImgUrl)
                        }} required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className=''>Асуулт </label>
                </div>
                <div className='flex'>
                    <div className='h-full mt-auto'>
                        <div className='m-auto'>
                            <div className="group w-full !bg-red-200">
                                <input onChange={(e) => {
                                    handleSchema(question, e.target.value, qImgUrl)
                                }}
                                    className={'custom-validation !border-b-[2px] !border-[#50a3a2] font-[400]'}
                                    type="number" required />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label className=''>Оноо </label>
                            </div>
                            {/* <div className="group w-full">
                            <input onChange={(e) => {
                                handleSchema(question, point, e.target.value)
                            }}
                                className={'custom-validation !border-b-[2px] !border-[#50a3a2] font-[400]'}
                                type="number" required />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label className=''>Хариултын тоо </label>
                        </div> */}
                            <div className="group w-full">
                                <input onChange={(e) => {
                                    handleAnswers(e.target.value)
                                }}
                                    className={'custom-validation !border-b-[2px] !border-[#50a3a2] font-[400]'}
                                    type="number" required />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label className=''>Хариултын тоо </label>
                            </div>
                        </div>
                    </div>
                    <div className="group w-full ml-5 mt-[20px]">
                        <ImageUploader />
                    </div>
                </div>
                <div className='h-[100px]'>
                    {
                        arr?.map((item, index) => (
                            <AnswerCellMain arr={arr[index]} checked={checked} handleChecked={handleChecked} item={item} 
                            handleValues={handleValues} handleCreateQuesiton={handleCreateQuesiton} key={index} index={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default CreateQuestionMain;