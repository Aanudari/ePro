import UserLayout from "../../../components/UserLayout";

function RatingUser() {
  return (
    <UserLayout>
      <main className="main">
        <div className="responsive-wrapper">
          <div className="main-header">
            <h1 className="text-[#404089]">Үнэлгээ</h1>
            <div className="search">
              <input type="text" placeholder="Search" />
              <button type="submit">
                <i className="ph-magnifying-glass-bold"></i>
              </button>
            </div>
          </div>
          <div className="horizontal-tabs">
            <a className="cursor-pointer">Нийт</a>
            <a className="cursor-pointer">Мессеж</a>
            <a className="cursor-pointer">Password</a>
            <a className="cursor-pointer">API</a>
          </div>
          <div className="content"></div>
        </div>
      </main>
    </UserLayout>
  );
}

export default RatingUser;
