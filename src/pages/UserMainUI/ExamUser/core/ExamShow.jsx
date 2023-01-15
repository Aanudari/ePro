import QuestionCellShow from "../Cell/QuestionCellShow";
import { useLocation } from "react-router-dom";
import ExamHeaderShow from "./ExamHeaderShow";

function ExamShow() {
  const location = useLocation();
  let data = location.state;
  let pre = localStorage.getItem("exam");
  let dataX = JSON.parse(pre);
  let container = [];
  let wrong = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element.onlyAnswerId) {
      if (element.onlyAnswerId[0]) {
        if (element.onlyAnswerId[0].isTrue == "1") {
          container.push(element.onlyAnswerId[0].answerId);
        }
        if (element.onlyAnswerId[0].isTrue == "0") {
          wrong.push(element.onlyAnswerId[0].answerId);
        }
      }
    }
  }
  return (
    <div className="px-16 w-full flex justify-center relative pt-20">
      <div className="w-4/6">
        {dataX?.map((item, i) => (
          <QuestionCellShow
            key={i}
            data={item}
            correct={container}
            wrong={wrong}
          />
        ))}
      </div>
      <ExamHeaderShow />
    </div>
  );
}

export default ExamShow;
