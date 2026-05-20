import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, Transition } from "@headlessui/react";

import { useStateContext } from "../contexts/ContextProvider";
import getWindowDimensions from "./SizeDetector";
import MobileBar from "./MobileBar";
import { logout } from "../service/examService";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navigation() {
  const navigate = useNavigate();
  const { width } = getWindowDimensions();

  const { activeMenu, setActiveMenu, mobileBar, setMobileBar, TOKEN } =
    useStateContext();

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUsers, setShowUsers] = useState(false);

  const inputRef = useRef(null);
  const mainUser = JSON.parse(localStorage.getItem("user") || "{}");

  const isMobile = width < 768;

  useEffect(() => {
    if (!TOKEN) return;

    const controller = new AbortController();

    axios
      .get(`${process.env.REACT_APP_URL}/v1/User`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data?.result || []);
      })
      .catch((err) => {
        if (err.name !== "CanceledError") console.log(err);
      });

    return () => controller.abort();
  }, [TOKEN]);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return users
      .filter((user) => {
        const username = user.username?.toLowerCase() || "";
        const firstName = user.firstName?.toLowerCase() || "";
        const roleName = user.roleName?.toLowerCase() || "";

        return (
          username.includes(query) ||
          firstName.includes(query) ||
          roleName.includes(query)
        );
      })
      .slice(0, 8);
  }, [users, searchQuery]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!searchQuery.trim()) return;

    navigate("/search-result", {
      state: { query: searchQuery.trim() },
    });

    setShowUsers(false);
    inputRef.current?.blur();
  };

  const handleUserClick = (user) => {
    navigate("/user-profile", { state: user });
    setShowUsers(false);
    setSearchQuery("");
    inputRef.current?.blur();
  };

  return (
    <header className="relative z-40">
      <div className="h-14" />

      <div
        className={classNames(
          "fixed top-0 z-40 h-14 bg-gray-800 shadow-sm transition-all duration-300",
          "flex items-center justify-between gap-2 px-2 md:px-4",
          activeMenu && !isMobile
            ? "left-64 w-[calc(100%-16rem)]"
            : "left-0 w-full",
        )}
      >
        <div className="flex items-center flex-1 min-w-0 gap-2 md:gap-4">
          <button
            type="button"
            onClick={() => {
              if (isMobile) {
                setMobileBar(true);
              } else {
                setActiveMenu(!activeMenu);
              }
            }}
            className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 text-sky-500 hover:bg-gray-700"
            aria-label="Toggle menu"
          >
            <i className="text-3xl bi bi-list" />
          </button>

          {mobileBar && <MobileBar />}

          <form
            onSubmit={handleSubmit}
            className="relative hidden w-full max-w-md sm:block"
          >
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Нэрээр хайлт хийх"
              className="w-full h-10 px-3 text-sm text-white bg-gray-700 border border-gray-600 rounded-lg outline-none placeholder:text-gray-300 focus:border-sky-500"
              onFocus={() => setShowUsers(true)}
              onBlur={() => setTimeout(() => setShowUsers(false), 150)}
            />

            {showUsers && filteredUsers.length > 0 && (
              <div className="absolute left-0 z-50 w-full mt-1 overflow-auto bg-white rounded-lg shadow-lg top-full max-h-64">
                {filteredUsers.map((user, index) => (
                  <button
                    key={user.id || user.userId || index}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleUserClick(user)}
                    className="flex h-11 w-full items-center justify-between gap-3 border-b px-3 text-left text-[13px] hover:bg-gray-100"
                  >
                    <span className="font-semibold text-gray-800 truncate">
                      {user.firstName || user.username}
                    </span>
                    <span className="text-gray-500 shrink-0">
                      {user.roleName}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>

        <div className="shrink-0">
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center h-10 gap-2 text-sm text-white bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white">
              <img
                className="object-cover rounded-full h-9 w-9"
                src="/user2.png"
                alt="User"
              />

              <span className="hidden max-w-[160px] truncate pr-2 text-sm md:block">
                {mainUser?.last_name?.[0] ? `${mainUser.last_name[0]}. ` : ""}
                {mainUser?.first_name || "User"}
              </span>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={logout}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "flex w-full items-center justify-end gap-2 px-4 py-2 text-sm text-gray-700",
                      )}
                    >
                      Гарах
                      <i className="bi bi-door-closed-fill" />
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
