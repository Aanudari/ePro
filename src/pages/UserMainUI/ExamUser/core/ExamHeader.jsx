function ExamHeader({ finisher, data }) {
  return (
    <div className="h-[60px] top-0 fixed bottom-0 bg-white shadow-sm w-full flex justify-end px-10">
      <nav
        onClick={() => {
          finisher();
        }}
        className="header-navigation-links bg-teal-500 px-3 my-2 rounded"
      >
        <a className="cursor-pointer"> Дуусгах </a>
      </nav>
    </div>
  );
}

export default ExamHeader;
