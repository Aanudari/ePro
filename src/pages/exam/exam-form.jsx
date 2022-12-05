import React, { useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import { useStateContext } from "../../contexts/ContextProvider";
import CreateExamForm from "./ExamForm/CreateExamForm";
import ExamFormControll from "./ExamForm/ExamFormControll";
import EditExamPool from "./Exam-Pool/EditExamPool";
import { QueryClient, QueryClientProvider } from "react-query";
import {examList} from "../../service/examService"
function ExamForm() {
  const queryClient = new QueryClient()
  const { TOKEN } = useStateContext();
  const [key, setKey] = useState('0');
  const navigate = useNavigate()
    const { isError, isSuccess, isLoading, data, error } = useQuery(
        ["examList"],
        examList,
        { staleTime: 3000 }
    );
    const logout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    }
    if (data && data.errorCode == 401) {
        logout()
    }
    if (isLoading) {
        return <Loading />;
    }
  return (
    <div className="w-full h-full min-h-screen bg-[#23b499]">
      <Navigation />
      <div className="h-full">
        <div className="bg-gray-700 h-14 flex">
          <div onClick={() => {
            setKey("0")
          }} className={`h-full w-1/6 md:w-[180px] hover:bg-gray-600 flex
          justify-center items-center text-white text-[14px] ${key === "0" && 'border-b shadow pt-[1px]'}`}>
            <span className="font-[500] hidden md:block">
              Идэвхитэй шалгалт
            </span>
            <span className="font-[500] block md:hidden">
              <i className="bi bi-calendar-check"></i>
            </span>
          </div>
          <div onClick={() => {
            setKey("1")
          }} className={`h-full w-1/6 md:w-[180px] hover:bg-gray-600 flex
          justify-center items-center text-white text-[14px] ${key === "1" && 'border-b shadow pt-[1px]'}`}>
            <span className="font-[500] hidden md:block">
              Ажлын байраар
            </span>
            <span className="font-[500] block md:hidden">
              <i className="bi bi-pencil"></i>
            </span>
          </div>
          <div onClick={() => {
            setKey("2")
          }} className={`h-full w-1/6 md:w-[180px] hover:bg-gray-600 flex
          justify-center items-center text-white text-[14px] ${key === "2" && 'border-b shadow pt-[1px]'}`}>
            <span className="font-[500] hidden md:block">
              Ажилтангаар
            </span>
            <span className="font-[500] block md:hidden">
              <i className="bi bi-alarm"></i>
            </span>
          </div>
        </div>
        <div className="">
          {
            key === "1" && <CreateExamForm setKeyMain={setKey} />
          }
          {
            key === "0" && <ExamFormControll setKeyX={setKey} />
          }
          {
            key === "1.1" && <QueryClientProvider client={queryClient}>
              <EditExamPool />
            </QueryClientProvider>
          }
        </div>
      </div>
    </div >
  );
}

export default ExamForm;
