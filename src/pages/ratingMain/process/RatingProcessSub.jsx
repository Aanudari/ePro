function RatingProcessSub({data, countPoints}) {
    let arr = [0]
    for (let index = 0; index < data.maxPoints; index++) {
        const element = index + 1
        arr.push(element)
    }
    return ( 
        <div className="py-1 px-4 border-b flex justify-between items-center">
            <span className="text-[14px] font-[400]">{data.name}</span>
            <select onChange={(e) => {
                countPoints(e.target.value, data.id)
            }} name="" id="" className="min-w-[60px] max-w-[60px]">
                {
                    arr.map((item, index) => (
                        <option key={index} value={`${index}`}>{item}</option>
                    ))
                }
            </select>
        </div>
     );
}

export default RatingProcessSub;