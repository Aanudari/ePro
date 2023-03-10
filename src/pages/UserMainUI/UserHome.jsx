import UserLayout from "../../components/UserLayout";

function UserHome() {
  return (
    <UserLayout>
      <main className="main">
        <div className="responsive-wrapper">
          {/* <h5 className="text-[#404089] text-center">Welcome to E-PRO</h5> */}
          <div className="content flex items-center justify-center h-full relative">
            <img
              src="https://image.shutterstock.com/image-vector/welcome-poster-spectrum-brush-strokes-260nw-1146069941.jpg"
              alt=""
              className="select-none"
            />
            <div className="w-[300px] h-[200px] bg-white absolute bottom-[-180px]"></div>
          </div>
        </div>
      </main>
    </UserLayout>
  );
}

export default UserHome;
