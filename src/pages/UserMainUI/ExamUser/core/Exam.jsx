import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../../../../contexts/ContextProvider";
import QuestionCell from "../Cell/QuestionCell";
import ExamHeader from "./ExamHeader";
import { logout } from "../../../../service/examService";
function Exam() {
  const navigate = useNavigate();
  let location = useLocation();
  let id = location.state;
  const finalId = sessionStorage.getItem("exam_id");
  const { TOKEN, deviceId, setSore } = useStateContext();
  const [data, setData] = useState();
  const [variant, setVariant] = useState();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew/start?examId=${finalId}`,
    })
      .then((res) => {
        if (res.data.errorCode === 401) {
          logout();
        } else if (res.data.isSuccess === false) {
          navigate("/user-main");
        } else {
          setVariant(res?.data);
          setData(res.data.variantInfo);
          localStorage.setItem(
            "exam",
            JSON.stringify(res.data.variantInfo.questionList)
          );
        }
      })
      .catch((err) => console.log(err));
  }, []);
  let temp = [];
  const [tempo, setTempo] = useState([]);
  let totalScore = 0;
  for (let index = 0; index < data?.questionList.length; index++) {
    const element = data.questionList[index];
    let dat = {
      questionId: element.id,
      onlyAnswerId: [
        {
          answerId: null,
          isTrue: "0",
        },
      ],
    };
    totalScore += parseInt(element.points);
    temp.push(dat);
  }
  const [questions, setQuestions] = useState([]);
  // console.log(questions);
  const collector = (props) => {
    setQuestions((prev) => [
      ...prev,
      { point: props.point, id: props.questionId },
    ]);
    if (tempo.length > 0) {
      let dataX = tempo.map((item) => {
        if (item.questionId == props.questionId) {
          return { ...item, onlyAnswerId: props.onlyAnswerId };
        } else {
          return item;
        }
      });
      setTempo(dataX);
    } else {
      let dataX = temp.map((item) => {
        if (item.questionId == props.questionId) {
          return { ...item, onlyAnswerId: props.onlyAnswerId };
        } else {
          return item;
        }
      });
      setTempo(dataX);
    }
  };
  const finisher = () => {
    let container = [];
    let tempNo = 0;
    for (let index = 0; index < tempo.length; index++) {
      const element = tempo[index];
      if (element.onlyAnswerId) {
        if (element.onlyAnswerId[0]) {
          if (element.onlyAnswerId[0].isTrue == "1")
            container.push(element.questionId);
        }
      }
    }
    for (let i = 0; i < container.length; i++) {
      const element = container[i];
      for (let j = 0; j < questions.length; j++) {
        const el = questions[j];
        if (element == el.id) {
          tempNo = tempNo + parseInt(el.point);
          break;
        }
      }
    }
    let score = Math.round((tempNo / totalScore) * 100);
    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

    let main = {
      examId: finalId,
      variantId: data.id,
      devId: deviceId,
      score: `${score}`,
      endAt:
        new Date().getFullYear() +
        "" +
        addZero(new Date().getMonth() + 1) +
        addZero(new Date().getDate()) +
        addZero(new Date().getHours()) +
        addZero(new Date().getMinutes()) +
        addZero(new Date().getSeconds()),
      onlyQuestionId: tempo,
    };
    navigate("/exam-result", { state: tempo });
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew/end`,
      data: main,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        setSore(score);
        navigate("/exam-result", { state: tempo });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="px-16 w-full flex justify-center relative pt-20">
      <div className="w-4/6">
        {data?.questionList.map((item, i) => (
          <QuestionCell collector={collector} key={i} data={item} />
        ))}
      </div>
      <ExamHeader
        data={tempo}
        finisher={finisher}
        minute={variant?.leftMinutes}
        second={variant?.leftSeconds}
        examName={variant?.examName}
        creater={variant?.createdBy}
      />
    </div>
  );
}

export default Exam;
