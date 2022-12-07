import React, { useState } from "react";
import Navigation from "../components/Navigation";

function Home() {
  const [showSettings, setshowSettings] = useState(false);
  const [showIndividual, setShowIndividual] = useState(false);
  return (
    <div className="w-full h-screen bg-[#50a3a2]">
      <Navigation />
      <div className="h-full px-5 py-3 flex gap-2">
        <div style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://media.istockphoto.com/vectors/online-cloud-file-query-and-management-isometric-businessman-holding-vector-id1294081206?k=20&m=1294081206&s=612x612&w=0&h=19dJEa2eUHR7KMDzoFGBsXBQu9kGHtbg6ZXj4JJbZQc=")`
        }} className="w-[400px] h-[200px] h-full bg-white rounded-lg py-2 px-3 flex flex-col justify-between">
          <div className="flex justify-between">
            <span className="font-[500] text-white">
              Үнэлгээний тайлан авах
            </span>
            <div
              onClick={() => {
                setshowSettings(true)
              }}
              style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://media.baamboozle.com/uploads/images/237734/1636014693_71944_url.png")`
              }} className="w-[70px] h-[50px] bg-red-100 rounded-full mt-4 hover:shadow-lg"></div>
          </div>
          <div>
            <button className="px-3 py-2 bg-sky-400 hover:shadow rounded-lg">
              <span className="font-[500] text-white">
                EXCEL FILE
              </span>
            </button>
          </div>
        </div>
        {
          showSettings ?
            <div className="flex flex-col w-[350px] h-[200px] bg-white rounded-lg py-3 px-3 justify-around">
              <div className=" flex justify-around">
                <div className="w-[100px] h-[60px] px-2 py-3 bg-sky-400 text-white rounded-lg flex justify-center font-[400] cursor-pointer">Жилээр</div>
                <div className="w-[100px] h-[60px] px-2 py-3 bg-sky-400 text-white rounded-lg flex justify-center font-[400] cursor-pointer">Улирлаар</div>
                <div className="w-[100px] h-[60px] px-2 py-3 bg-sky-400 text-white rounded-lg flex justify-center font-[400] cursor-pointer">Cараар</div>
              </div>
              <div className="flex justify-around">
                <div className="w-[100px] h-[60px] px-2 py-3 bg-cyan-400 text-white rounded-lg flex justify-center font-[400] cursor-pointer">Хэлтэс</div>
                <div className="w-[100px] h-[60px] px-2 py-3 bg-cyan-400 text-white rounded-lg flex justify-center font-[400] cursor-pointer">Алба нэгж</div>
                <div onClick={() => {
                  setShowIndividual(true);
                }} className="w-[100px] h-[60px] px-2 py-3 bg-cyan-400 text-white rounded-lg flex justify-center font-[400] cursor-pointer">Ажилтан</div>
              </div>
            </div>
            : null
        }
        {
          showIndividual ?
            <div className="flex flex-col w-[350px] h-[200px] bg-gray-200 rounded-lg py-3 px-3 justify-around">
              <div className=" flex justify-around gap-2">
                {/* <div className="">Жилээр</div> */}
                <input type="text" className="custom-input" />
                <div className="w-[100px] h-[60px] px-2 py-3 bg-sky-400 text-white rounded-lg flex justify-center font-[400] cursor-pointer">Хайх</div>
              </div>
              <div className="flex justify-start gap-2">
                <div className="w-[100px] h-[60px] px-2 py-3 bg-cyan-400 text-white rounded-lg flex justify-center font-[400] cursor-pointer">Жагсаалт</div>
                <div onClick={() => {
                  setShowIndividual(false);
                  setshowSettings(false);
                }} className="w-[100px] h-[60px] px-2 py-3 bg-red-400 text-white rounded-lg flex justify-center font-[400] cursor-pointer">Хаах</div>
              </div>
            </div> : null
        }
      </div>
    </div>
  );
}

export default Home;
