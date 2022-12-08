import { useState } from 'react';
import ImageOption from "../exam/ExamForm/ImageOptions"
import ImageUploader from './../exam/ExamForm/ImageUploader';
function CreateQuestionMain({ setQuestion, question, point, setPoint, setQImgUrl, handleSchema, qImgUrl }) {
    const [imageValue, setImageValue] = useState();
    return (
        <div className="w-full h-full pt-5">
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
                        <div className="group w-full">
                            <input onChange={(e) => {
                                handleSchema(question, point, e.target.value)
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
            </div>
        </div>
    );
}

export default CreateQuestionMain;