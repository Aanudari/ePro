import MyTimer from "../../components/Timer";

function ExamContoller() {
    const time = new Date();
    time.setMinutes(time.getMinutes() + 10);
    return ( 
        <div className="h-14 bg-red-100 w-full"><MyTimer expiryTimestamp={time}/></div>
     );
}

export default ExamContoller;