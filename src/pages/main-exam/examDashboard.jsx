import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import ExamBoard from "./ExamBoard";
import axios from "axios";
import ExamBoardController from "./ExamBoardController";
import ExamCategory from "./modal/ExamCategory";
import CategoryModal from "./modal/CategoryModal";
import ExamModalMain from "./modal/ExamModalMain";
import ImageBoard from "./modal/ImageBoard";
import AddCategoryMenu from "./modal/AddCategoryMenu";
import Document from "./modal/Document";
import DocumentFinishedExam from "./modal/DocumentFinishedExam";
import { logout } from "../../service/examService";
function ExamDash() {
  const [examModalId, setexamModalId] = useState();
  const [categoryModal, setCategoryModal] = useState(false);
  const { TOKEN } = useStateContext();
  const [data, setData] = useState();
  const [categories, setCategories] = useState();
  const [examModal, setExamModal] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [imgStatus, setImgStatus] = useState(false);
  const [examTri, setExamTri] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [addAnswer, setAddAnswer] = useState(false);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        if (res.data.errorCode == 401) {
          logout();
        } else {
          setData(res.data.examList);
        }
      })
      .catch((err) => console.log(err));
  }, [categoryModal, examModal, examTri]);
  //   console.log(data);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/Pool/Category`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        if (res.data.errorCode == 401) {
          logout();
        } else {
          setCategories(res.data.categoryList);
        }
      })
      .catch((err) => console.log(err));
  }, [trigger, showAddCategory, addAnswer]);
  const [depId, setDepId] = useState();
  const [cModalId, setCModalId] = useState();

  const handleCategoryModal = (id, Did) => {
    setCModalId(id);
    setDepId(Did);
  };
  const [examSummary, setExamSummary] = useState();
  const handleExamModal = (id, status) => {
    setExamSummary(status);
    setexamModalId(id);
  };
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showDocument, setShowDocument] = useState(false);
  return (
    <div className="w-full min-h-screen bg-teal-500 relative">
      <Navigation />
      <div className="px-2 py-1 flex h-[calc(100%-64px)] items-end justify-center">
        <div className="h-full flex flex-col justify-between">
          {showCategoryMenu && (
            <ExamCategory
              categories={categories && categories}
              categoryModal={categoryModal}
              setCategoryModal={setCategoryModal}
              setShowCategoryMenu={setShowCategoryMenu}
              handleCategoryModal={handleCategoryModal}
              trigger={trigger}
              setTrigger={setTrigger}
              showAddCategory={showAddCategory}
              setShowAddCategory={setShowAddCategory}
            />
          )}
          <ExamBoard
            examModal={examModal}
            setExamModal={setExamModal}
            exams={data && data}
            handleExamModal={handleExamModal}
            setShowReport={setShowReport}
            setShowDocument={setShowDocument}
          />
          {imgStatus && (
            <ImageBoard imgStatus={imgStatus} setImgStatus={setImgStatus} />
          )}
          {showReport && (
            <Document setShowReport={setShowReport} id={examModalId} />
          )}
          {showDocument && (
            <DocumentFinishedExam
              setShowDocument={setShowDocument}
              exams={data && data}
              id={examModalId}
            />
          )}
        </div>
        <ExamBoardController
          imgStatus={imgStatus}
          setImgStatus={setImgStatus}
          showCategoryMenu={showCategoryMenu}
          setShowCategoryMenu={setShowCategoryMenu}
        />
      </div>
      {categoryModal && (
        <CategoryModal
          addAnswer={addAnswer}
          setAddAnswer={setAddAnswer}
          setTriggerCat={setTrigger}
          triggerCat={trigger}
          setShowCategoryMenu={setShowCategoryMenu}
          depId={depId}
          id={cModalId}
          setCategoryModal={setCategoryModal}
        />
      )}
      {examModal && (
        <ExamModalMain
          examTri={examTri}
          setExamTri={setExamTri}
          exams={data}
          id={examModalId}
          setExamModal={setExamModal}
          examSummary={examSummary}
        />
      )}
      {showAddCategory && (
        <AddCategoryMenu
          trigger={trigger}
          setTrigger={setTrigger}
          showAddCategory={showAddCategory}
          setShowAddCategory={setShowAddCategory}
        />
      )}
    </div>
  );
}

export default ExamDash;
