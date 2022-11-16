import { getQuestionDetail } from "../../../service/examService"
import Loading from "../../../components/Loading";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import QuestionCellPool from "./Exam-PoolComp/QuestionCellPool";

function EditExamPool() {
    const navigate = useNavigate()
    const { isError, isSuccess, isLoading, data, error } = useQuery(
        ["getQuestionDetail"],
        getQuestionDetail,
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
        <div className=" w-full h-full">
            <div className="h-8 w-full bg-gray-600 px-[28px] text-white text-[13px] flex
            items-center font-[500]
            ">Вариатууд:
                <div className="w-[50px] h-full flex items-center justify-center hover:bg-gray-400 ml-2">A</div>
                <div className="w-[50px] h-full flex items-center justify-center hover:bg-gray-400">B</div>
                <div className="w-[50px] h-full flex items-center justify-center hover:bg-gray-400">C</div>
            </div>
            <div className="px-[28px] mt-4">
                {
                    data.variants.map((item, index) => (
                        <div key={index} className="">
                            {
                                item.questionList.map((item, index) => (
                                    <QuestionCellPool key={index} item={item}/>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default EditExamPool;