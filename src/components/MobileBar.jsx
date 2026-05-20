import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const menuItems = [
  {
    title: "Хянах самбар",
    path: "/dashboard",
    icon: "bi bi-calendar-check",
  },
  {
    title: "Шалгалт",
    icon: "bi bi-clock",
    children: [
      { title: "Шалгалтын форм", path: "/exam-form" },
      { title: "Шалгалт өгөх", path: "/take-exam" },
      { title: "Шалгалтын дүн харах", path: "/exam-result" },
    ],
  },
  {
    title: "Үнэлгээ",
    icon: "bi bi-bar-chart-line",
    children: [
      { title: "Level 1", path: "/level-one" },
      { title: "Telesales", path: "/telesales" },
      { title: "Online", path: "/online" },
      { title: "Branch", path: "/branch" },
      { title: "Installer", path: "/installer" },
      { title: "Care", path: "/care" },
      { title: "Bank", path: "/bank" },
    ],
  },
  {
    title: "Сургалт",
    icon: "bi bi-book",
    children: [
      { title: "Онлайн сургалт", path: "/online-training" },
      { title: "Сургалтын хуваарь", path: "/training-schedule" },
      { title: "Сургалтын файлууд", path: "/training-files" },
      { title: "Сургалтын ангилал", path: "/training-category" },
      { title: "Сургалтын үнэлгээ", path: "/training-rating" },
    ],
  },
  {
    title: "Calendar",
    path: "/calendar",
    icon: "bi bi-calendar-check",
  },
  {
    title: "Алдаа / талархал",
    path: "/error-thanks",
    icon: "bi bi-bookmark-plus",
  },
];

function MobileBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setMobileBar } = useStateContext();

  const [openMenu, setOpenMenu] = useState(null);

  const goTo = (path) => {
    navigate(path);
    setMobileBar(false);
  };

  const isActive = (item) => {
    if (item.path === location.pathname) return true;

    return item.children?.some((child) => child.path === location.pathname);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setMobileBar(false)}
        className="fixed inset-0 z-40 bg-black/50 md:hidden"
      />

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 z-50 h-screen w-[82%] max-w-[320px] bg-gray-800 text-white shadow-xl md:hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 border-b border-gray-700 h-14">
          <button
            type="button"
            onClick={() => goTo("/home")}
            className="text-xl font-bold tracking-wide"
          >
            E-PRO
          </button>

          <button
            type="button"
            onClick={() => setMobileBar(false)}
            className="flex items-center justify-center rounded-lg h-9 w-9 hover:bg-gray-700"
          >
            <i className="text-lg bi bi-x-lg" />
          </button>
        </div>

        {/* Menu */}
        <nav className="h-[calc(100vh-56px)] overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const active = isActive(item);
              const opened = openMenu === item.title;

              return (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => {
                      if (item.children) {
                        setOpenMenu(opened ? null : item.title);
                      } else {
                        goTo(item.path);
                      }
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition ${
                      active
                        ? "bg-teal-500 text-white"
                        : "text-gray-200 hover:bg-gray-700"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <i className={`${item.icon} text-lg`} />
                      <span className="text-sm font-medium">{item.title}</span>
                    </span>

                    {item.children && (
                      <i
                        className={`bi bi-chevron-right text-sm transition-transform ${
                          opened ? "rotate-90" : ""
                        }`}
                      />
                    )}
                  </button>

                  {item.children && opened && (
                    <ul className="pl-3 mt-1 ml-5 space-y-1 border-l border-gray-700">
                      {item.children.map((child) => {
                        const childActive = location.pathname === child.path;

                        return (
                          <li key={child.path}>
                            <button
                              type="button"
                              onClick={() => goTo(child.path)}
                              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                                childActive
                                  ? "bg-teal-400 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                              }`}
                            >
                              {child.title}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default MobileBar;
