import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const menuItems = [
  { title: "Шалгалт", path: "/exam-dashboard", icon: "bi bi-clock" },
  { title: "Үнэлгээ", path: "/rating", icon: "bi bi-bar-chart-line" },
  {
    title: "Сургалт",
    icon: "bi bi-book",
    expandable: true,
    children: [
      { title: "Онлайн сургалт", path: "/online-training" },
      { title: "Сургалтын хуваарь", path: "/training-schedule" },
      { title: "Сургалтын файлууд", path: "/training-files" },
      { title: "Сургалтын ангилал", path: "/training-category" },
      { title: "Сургалтын үнэлгээ", path: "/training-rating" },
    ],
  },
  {
    title: "Алдаа / талархал",
    path: "/error-thanks",
    icon: "bi bi-bookmark-plus",
  },
];

export default function MainNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { TOKEN, activeMenu, setActiveMenu } = useStateContext();

  const [expanded, setExpanded] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleExpand = (title) => {
    setExpanded((prev) => (prev === title ? null : title));
  };

  const isActive = (path, children) => {
    if (path && location.pathname === path) return true;
    if (children) {
      return children.some((child) => child.path === location.pathname);
    }
    return false;
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  useEffect(() => {
    const activeParent = menuItems.find((item) =>
      item.children?.some((child) => child.path === location.pathname),
    );

    if (activeParent) {
      setExpanded(activeParent.title);
    }
  }, [location.pathname]);

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 text-white bg-gray-800 border-b border-gray-700 h-14 md:hidden">
        <span className="text-2xl font-extrabold tracking-wide text-white">
          E-PRO
        </span>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-700"
          aria-label="Open menu"
        >
          <i className="text-2xl bi bi-list"></i>
        </button>
      </header>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72 bg-gray-800 text-white
          transform transition-transform duration-300 ease-in-out
          md:translate-x-0 md:w-64 md:z-30
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 border-b border-gray-700 h-14">
          <span className="text-2xl font-extrabold tracking-wide text-white">
            E-PRO
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center rounded-lg w-9 h-9 hover:bg-gray-700 md:hidden"
            aria-label="Close menu"
          >
            <i className="text-xl bi bi-x-lg"></i>
          </button>
        </div>

        {/* Menu */}
        <nav className="h-[calc(100%-56px)] overflow-y-auto py-4">
          <ul className="px-3 space-y-1">
            {menuItems.map((item) => {
              const active = isActive(item.path, item.children);

              return (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() =>
                      item.expandable
                        ? toggleExpand(item.title)
                        : handleNavigate(item.path)
                    }
                    className={`
                      flex w-full items-center justify-between rounded-xl px-3 py-3
                      text-left transition-colors
                      ${
                        active
                          ? "bg-teal-500 text-white"
                          : "text-gray-200 hover:bg-gray-700"
                      }
                    `}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon && <i className={`${item.icon} text-lg`} />}
                      <span className="text-sm font-medium">{item.title}</span>
                    </span>

                    {item.expandable && (
                      <i
                        className={`
                          bi bi-chevron-right text-sm transition-transform duration-200
                          ${expanded === item.title ? "rotate-90" : ""}
                        `}
                      />
                    )}
                  </button>

                  {/* Submenu */}
                  {item.expandable && expanded === item.title && (
                    <ul className="pl-3 mt-1 ml-5 space-y-1 border-l border-gray-700">
                      {item.children.map((child) => {
                        const childActive = location.pathname === child.path;

                        return (
                          <li key={child.path}>
                            <button
                              type="button"
                              onClick={() => handleNavigate(child.path)}
                              className={`
                                w-full rounded-lg px-3 py-2 text-left text-sm transition-colors
                                ${
                                  childActive
                                    ? "bg-teal-400 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }
                              `}
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

      {/* Desktop spacing */}
      <div className="hidden md:block md:w-64 shrink-0" />
    </>
  );
}
