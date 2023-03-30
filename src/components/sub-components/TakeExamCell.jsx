import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
function TakeExamCell(data) {
  const navigate = useNavigate();
  const { readyCheck, setReadyCheck, setExamID } = useStateContext();
  return (
    <tbody className="divide-y divide-gray-200 hover:bg-gray-200">
      <tr>
        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
          {data.data.id}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {data.data.name}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {data.data.startDate}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {data.data.expireDate}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {data.data.duration} мин
        </td>
        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
          <span
            onClick={() => {
              setReadyCheck(!readyCheck);
              setExamID(data.data.id);
              sessionStorage.setItem("exam_id", data.data.id);
            }}
            className="text-green-500 hover:text-green-700"
          >
            Эхлэх
          </span>
        </td>
      </tr>
    </tbody>
  );
}

export default TakeExamCell;
