import Navigation from "../../components/Navigation";

function RatingLayout({ children }) {
  return (
    <div className="w-full min-h-screen bg-white relative text-[12px]">
      {/* {loading && <Loading />} */}
      <Navigation />
      <div className="w-full h-[calc(100%-56px)] ">{children}</div>
    </div>
  );
}

export default RatingLayout;
