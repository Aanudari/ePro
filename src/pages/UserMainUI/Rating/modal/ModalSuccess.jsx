function ModalSuccess() {
  return (
    <div className="fixed w-screen h-screen bg-black custom-opacity  top-0 left-0 z-20 body-parent">
      <div className="bg-blur absolute h-screen w-screen "></div>
      <svg viewBox="0 0 400 400" width="200" height="200" className="z-20">
        <circle
          fill="none"
          stroke="#68E534"
          strokeWidth="21"
          cx="200"
          cy="200"
          r="190"
          transform="rotate(-90 200 200)"
          className="circle z-20"
        />
        <polyline
          fill="none"
          stroke="#68E534"
          strokeWidth="24"
          points="110,195 179,258 290,112"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tick"
        />
      </svg>
      <h2 className="text-white">Үнэлгээ баталгаажлаа</h2>
    </div>
  );
}

export default ModalSuccess;
