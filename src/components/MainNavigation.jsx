// import { useLocation, useNavigate } from "react-router-dom";
// import { useStateContext } from "../contexts/ContextProvider";
// import { useState, useEffect } from "react";
// import axios from "axios";
// function MainNavigation() {
//   const navigate = useNavigate();
//   const { TOKEN } = useStateContext();
//   const [selected, setSelected] = useState(0);
//   const location = useLocation();
//   const pathname = (pathname) => {
//     let accepted = [
//       "/training-files",
//       "/training-category",
//       "/online-training",
//       "/training-rating",
//       "/training-schedule",
//     ];
//     if (accepted.includes(pathname)) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   return (
//     <div className="relative width-nav">
//       <div className="core fixed">
//         <nav id="side-nav">
//           <div
//             className="h-14 bg-gray-800 shadow text-white
//                     flex text-2xl font-[700] cursor-pointer select-none
//                     "
//           >
//             <span
//               className=" transition w-full h-full flex
//                         items-center
//                         font-bold ml-12 text-teal-500"
//             >
//               <span className="text-4xl text-teal-300 mr-1 rounded-full py-1">
//                 E
//               </span>

//               <img
//                 className="mb-2"
//                 src="data:image/png;base64,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"
//               ></img>
//             </span>
//           </div>
//           <ul className="h-full">
//             <li
//               onClick={() => {
//                 setSelected(0);
//                 navigate("/exam-dashboard");
//               }}
//               className={`relative cursor-pointer active:opacity-80 ${
//                 selected == 0 && "bg-teal-500"
//               }`}
//             >
//               <a>
//                 <i
//                   onClick={() => {
//                     navigate("/exam-dashboard");
//                   }}
//                   className="bi bi-clock absolute top-[17px] left-[17px] "
//                 ></i>
//                 <span className="select-none">Шалгалт</span>
//               </a>
//             </li>
//             <li
//               onClick={() => {
//                 setSelected(1);
//                 navigate("/rating");
//               }}
//               className={`relative cursor-pointer active:opacity-80 ${
//                 selected == 1 && "bg-teal-500"
//               }`}
//             >
//               <a>
//                 <i className="bi bi-bar-chart-line absolute top-[17px] left-[17px] select-none"></i>
//                 <span className="select-none">Үнэлгээ</span>
//               </a>
//             </li>
//             <li
//               onClick={() => {
//                 setSelected(2);
//                 // navigate("/online-training");
//               }}
//               className={`cursor-pointer select-none ${
//                 (selected == 2 && pathname(location.pathname) == true) ||
//                 (location.pathname == "/training-schedule" && "bg-teal-500")
//               }`}
//             >
//               <a className={`cursor-pointer select-none `}>
//                 <i
//                   className={`bi bi-book absolute top-[17px] left-[17px] `}
//                 ></i>
//                 <span>Сургалт</span>
//               </a>
//               <ul>
//                 <li className="relative cursor-pointer active:opacity-80 ">
//                   <a
//                     className="cursor-pointer select-none"
//                     onClick={() => {
//                       navigate("/online-training");
//                     }}
//                   >
//                     Онлайн сургалт
//                   </a>
//                 </li>
//                 <li className="relative cursor-pointer active:opacity-80 ">
//                   <a
//                     className="cursor-pointer select-none"
//                     onClick={() => {
//                       navigate("/training-schedule");
//                     }}
//                   >
//                     Сургалтын хуваарь
//                   </a>
//                 </li>
//                 <li className="relative cursor-pointer active:opacity-80">
//                   <a
//                     className="cursor-pointer select-none"
//                     onClick={() => {
//                       navigate("/training-files");
//                     }}
//                   >
//                     Сургалтын файлууд
//                   </a>
//                 </li>
//                 <li className="relative cursor-pointer active:opacity-80 ">
//                   <a
//                     className="cursor-pointer select-none"
//                     onClick={() => {
//                       navigate("/training-category");
//                     }}
//                   >
//                     Сургалтын ангилал
//                   </a>
//                 </li>
//                 <li className="relative cursor-pointer active:opacity-80 ">
//                   <a
//                     className="cursor-pointer select-none"
//                     onClick={() => {
//                       navigate("/training-rating");
//                     }}
//                   >
//                     Сургалтын үнэлгээ
//                   </a>
//                 </li>
//               </ul>
//             </li>

//             <li
//               onClick={() => {
//                 setSelected(3);
//               }}
//               className={`cursor-pointer select-none ${
//                 selected == 3 && "bg-teal-500"
//               }`}
//             >
//               <a
//                 className="cursor-pointer select-none"
//                 onClick={() => {
//                   navigate("/error-thanks");
//                 }}
//               >
//                 <i className="bi bi-bookmark-plus absolute top-[17px] left-[17px]"></i>
//                 <span>Алдаа / талархал</span>
//               </a>
//             </li>
//           </ul>
//           <a id="toggle">
//             <i className="fa fa-chevron-circle-left"></i>
//           </a>
//         </nav>
//       </div>
//     </div>
//   );
// }

// export default MainNavigation;

import { useState } from "react";
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
  const { TOKEN } = useStateContext();
  const [expanded, setExpanded] = useState(null); // only one expanded at a time

  const toggleExpand = (title) => {
    setExpanded(expanded === title ? null : title);
  };

  const isActive = (path, children) => {
    if (path && location.pathname === path) return true;
    if (children)
      return children.some((child) => child.path === location.pathname);
    return false;
  };

  return (
    <div className="relative width-nav">
      <div className="core fixed h-full">
        <nav className="bg-gray-800 text-white w-64 h-full">
          {/* Logo */}
          <div className="h-14 flex items-center justify-center font-bold text-xl border-b border-gray-700">
            <img
              src="/epro.png" // <-- points to public/epro.png
              alt="e-pro"
              className="h-6" // adjust size as needed
            />
          </div>

          {/* Menu */}
          <ul className="mt-4">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <div
                  className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-700 transition-colors ${
                    isActive(item.path, item.children) ? "bg-teal-500" : ""
                  }`}
                  onClick={() =>
                    item.expandable
                      ? toggleExpand(item.title)
                      : navigate(item.path)
                  }
                >
                  <div className="flex items-center gap-3">
                    {item.icon && <i className={item.icon}></i>}
                    <span>{item.title}</span>
                  </div>
                  {item.expandable && (
                    <i
                      className={`bi ml-auto transition-transform duration-200 ${
                        expanded === item.title
                          ? "bi-chevron-down rotate-180"
                          : "bi-chevron-right"
                      }`}
                    ></i>
                  )}
                </div>

                {/* Submenu */}
                {item.expandable && expanded === item.title && (
                  <ul className="ml-6 mt-1 flex flex-col gap-1">
                    {item.children.map((child, cidx) => (
                      <li
                        key={cidx}
                        className={`px-2 py-2 rounded cursor-pointer hover:bg-gray-700 transition-colors ${
                          location.pathname === child.path ? "bg-teal-400" : ""
                        }`}
                        onClick={() => navigate(child.path)}
                      >
                        {child.title}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
