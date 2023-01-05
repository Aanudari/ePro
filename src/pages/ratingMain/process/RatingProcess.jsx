import RatingProcessSub from "./RatingProcessSub";
import { useState } from "react";
import { useEffect } from "react";
function RatingProcess({ item, handleSubmit }) {
    let schema = []
    for (let index = 0; index < item.subCategory.length; index++) {
        const element = item.subCategory[index];
        let id = element.id
        let base = {
            "id": id,
            "points": 0
        }
        schema.push(base)
    }
    const [main, setMain] = useState(schema);
    const countPoints = (value, id) => {
        let pre = main.filter((item, i) => {
            return item.id !== id
        })
        let base = {
            "id": id,
            "points": value
        }
        pre.push(base)
        setMain(pre)
    }
    let total = main.map(e => Number(e.points)).reduce((a, b) => a + b, 0)
    useEffect(() => {
        handleSubmit(main, total, item.id)
    }, [main])
    return (
        <div className="mt-2">
            <div className="w-full bg-teal-500 h-12 rounded-t-lg flex items-center px-4 justify-between">
                <span className="font-[400] text-white">{item.name}</span>
                <span className="font-[400] text-white">{total}/{item.maxPoints}
                    <i className="bi bi-percent"></i></span>
            </div>
            <div className="border-l border-r border-teal-500">
                {
                    item.subCategory.map((el, index) => (
                        <RatingProcessSub data={el} key={index} countPoints={countPoints} />
                    ))
                }
            </div>
        </div>
    );
}

export default RatingProcess;