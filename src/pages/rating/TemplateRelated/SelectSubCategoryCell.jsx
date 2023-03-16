import { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
function SelectSubCategoryCell({ i, element, handleSelect, catIndex }) {
  const container = [
    {
      value: 0,
      point: 0,
    },
  ];
  for (let index = 0; index < parseInt(element.subCatMaxScore); index++) {
    const arr = {
      value: index + 1,
      point: index + 1,
    };
    container.push(arr);
  }
  const options = container.map((item, index) => {
    return (
      <option key={index} value={`${item.value}`} className={""}>
        {item.point}
      </option>
    );
  });
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );
  const [pointValue, setPointValue] = useState(element.subCatUserScore);
  const [progress, setProgress] = useState(
    parseInt((element.subCatUserScore * 100) / element.subCatMaxScore)
  );
  return (
    <div
      key={i}
      className="border py-1 px-2 flex justify-between items-center bg-white rounded mt-[2px]"
    >
      <div className="text-[13px] font-[400] w-[calc(90%)] ">
        {element.subCategoryName}
      </div>

      <div className="h-full flex items-start flex-col gap-1">
        <select
          onChange={(e) => {
            setPointValue(e.target.value);
            setProgress((e.target.value * 100) / element.subCatMaxScore);
            handleSelect(catIndex, element.subCategoryId, e.target.value);
          }}
          value={pointValue}
          className="w-[80px] "
        >
          {options}
        </select>
        {/* <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <button className=" btn-20 h-10">click</button>
        </OverlayTrigger> */}
        <div className="w-[80px] h-2 rounded bg-gray-300 relative">
          <div
            style={{
              width: `${
                Math.round(progress) == undefined ? 0 : Math.round(progress)
              }%`,
            }}
            className={`h-2 bg-emerald-600 rounded absolute`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default SelectSubCategoryCell;
