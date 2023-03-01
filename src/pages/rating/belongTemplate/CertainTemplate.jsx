import { useLocation } from "react-router-dom";
import RatingLayout from "../RatingLayout";
import tempAPI from "../../../service/templateAPI";
import { useState, useEffect } from "react";

function CertainTemplate() {
  const location = useLocation();
  const template = location.state.template;
  const [data, setData] = useState();
  useEffect(() => {
    tempAPI
      .getTemaplateInside(template.templateId)
      .then((res) => setData(res.data));
  }, []);
  return (
    <RatingLayout>
      <div className="bg-teal-500 h-[calc(100vh-56px)] flex flex-col">
        <div className="w-full h-[56px] bg-gray-600 flex items-center px-3 text-white">
          <h6>{template.templateName}</h6>
        </div>
        <div className="h-full w-full "></div>
      </div>
    </RatingLayout>
  );
}

export default CertainTemplate;
