import { useEffect, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import TakeExamCellAdmin from "../../../components/sub-components/TakeExamCellAdmin";

function ExamFormControll() {
    const {TOKEN} = useStateContext();
    const [data, setData] = useState();
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${TOKEN}`
            },
            url: "http://192.168.10.248:9000/v1/Exam",
        })
            .then(
                res => {
                    setData(res.data.examList)
                }
            )
            .catch(err => console.log(err))
    }, [])
    return ( 
        <div className="w-full flex flex-wrap gap-4 px-4 justify-center md:justify-start "> 
            {
                data && 
                data.map((item, index) => (
                    <TakeExamCellAdmin data={item} key={index} index={index}/>
                ))
            }
</div>

     );
}

export default ExamFormControll;