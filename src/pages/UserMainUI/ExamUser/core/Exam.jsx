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
  const { TOKEN, deviceId } = useStateContext();
  const [data, setData] = useState();
  const [variant, setVariant] = useState();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew/start?examId=${id}`,
    })
      .then((res) => {
        if (res.data.errorCode === 401) {
          logout();
        } else {
          setVariant(res.data);
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
    temp.push(dat);
  }
  const collector = (props) => {
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
    for (let index = 0; index < tempo.length; index++) {
      const element = tempo[index];
      if (element.onlyAnswerId) {
        if (element.onlyAnswerId[0]) {
          if (element.onlyAnswerId[0].isTrue == "1")
            container.push(element.onlyAnswerId[0].isTrue);
        }
      }
    }
    let score = Math.round((container.length * 100) / tempo.length);
    // console.log(score);
    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
    let main = {
      examId: id,
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
    // axios({
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: TOKEN,
    //   },
    //   url: `${process.env.REACT_APP_URL}/v1/ExamNew/end`,
    //   data: main,
    // })
    //   .then((res) => {
    //     console.log(res);
    //     navigate("/exam-result", { state: tempo });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  return (
    <div className="px-16 w-full flex justify-center relative pt-20">
      <div className="w-4/6">
        {data?.questionList.map((item, i) => (
          <QuestionCell collector={collector} key={i} data={item} />
        ))}
      </div>
      <ExamHeader data={tempo} finisher={finisher} />
    </div>
  );
}

export default Exam;
