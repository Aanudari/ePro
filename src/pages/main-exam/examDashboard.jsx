import React, {useEffect, useState} from 'react';
import Navigation from '../../components/Navigation';
import { useStateContext } from '../../contexts/ContextProvider';
import ExamBoard from './ExamBoard';
import axios from 'axios';
import ExamBoardController from './ExamBoardController';
import { useNavigate } from 'react-router-dom';
import ExamCategory from './ExamCategory';
import CategoryModal from './CategoryModal';
import ExamModalMain from './ExamModalMain';
import ImageBoard from './ImageBoard';
function ExamDash() {
    const [examModalId, setexamModalId] = useState();
    const [categoryModal, setCategoryModal] = useState(false);
    const {TOKEN} = useStateContext();
    const [data, setData] = useState();
    const [categories, setCategories] = useState();
    const navigate = useNavigate();
    const [examModal, setExamModal] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [imgStatus, setImgStatus] = useState(false);
    const logout = () => {
      localStorage.clear();
      navigate("/");
      window.location.reload();
    };
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${TOKEN}`
            },
            url: "http://192.168.10.248:9000/v1/ExamNew",
        })
            .then(
                res => {
                    if(res.data.errorCode == 401) {
                        logout()
                    } else {
                        setData(res.data.examList)
                    }
                }
            )
            .catch(err => console.log(err))
    }, [categoryModal, examModal])
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${TOKEN}`
            },
            url: "http://192.168.10.248:9000/v1/Pool/Category",
        })
            .then(
                res => {
                    if(res.data.errorCode == 401) {
                        logout()
                    } else {
                        setCategories(res.data.categoryList)
                    }
                }
            )
            .catch(err => console.log(err))
    }, [trigger])
    const [depId, setDepId] = useState();
    const [cModalId, setCModalId] = useState();

    const handleCategoryModal = (id, Did) => {
        setCModalId(id)
        setDepId(Did)
    }
    const handleExamModal = (id) => {
        setexamModalId(id)
    }
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);
    return ( 
    <div className="w-full min-h-screen bg-gray-200 relative">
      <Navigation />
      <div className='px-2 py-1 flex h-[calc(100%-64px)] items-end'>
        <div className='h-full flex flex-col justify-between'>
            {
                showCategoryMenu && 
            <ExamCategory categories={categories && categories} categoryModal={categoryModal} 
            setCategoryModal={setCategoryModal} setShowCategoryMenu={setShowCategoryMenu} 
            handleCategoryModal={handleCategoryModal} trigger={trigger} setTrigger={setTrigger}/> 
            }
            <ExamBoard examModal={examModal} setExamModal={setExamModal} exams={data && data}
            handleExamModal={handleExamModal}
            />
            {
                imgStatus && 
                <ImageBoard imgStatus={imgStatus} setImgStatus={setImgStatus}/>
            }
        </div>
            <ExamBoardController imgStatus={imgStatus} setImgStatus={setImgStatus} showCategoryMenu={showCategoryMenu}
             setShowCategoryMenu={setShowCategoryMenu}/>
      </div>
      {
        categoryModal && <CategoryModal setTriggerCat={setTrigger} triggerCat={trigger}
         setShowCategoryMenu={setShowCategoryMenu} depId={depId} id={cModalId} setCategoryModal={setCategoryModal}/>
      }
      {
        examModal && 
        <ExamModalMain id={examModalId} setExamModal={setExamModal}/>
      }
    </div>
     );
}

export default ExamDash;