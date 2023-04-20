import React, { useState, useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
function Test() {
  const toggleFolderRef = useRef(null);

  useEffect(() => {
    const toggleFolder = toggleFolderRef.current;

    const showFolderContentAnimation = anime.timeline({
      easing: "easeOutCubic",
      autoplay: false,
    });

    showFolderContentAnimation
      .add({
        targets: "#js_folder-content",
        height: [0, 240],
        duration: 350,
      })
      .add(
        {
          targets: "#js_folder-summary-amount",
          opacity: [1, 0],
          duration: 400,
        },
        "-=350"
      )
      .add(
        {
          targets: "#js_folder-collapse-button",
          opacity: [0, 1],
          duration: 400,
        },
        "-=300"
      )
      .add(
        {
          targets: "#js_folder-collapse-button-icon",
          duration: 300,
          translateX: ["-50%", "-50%"],
          translateY: ["-50%", "-50%"],
          rotate: ["0deg", "180deg"],
        },
        "-=400"
      )
      .add(
        {
          targets: ".js_folder-item",
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 300,
          delay: (el, i, l) => i * 120,
        },
        "-=275"
      );

    toggleFolder.addEventListener("click", () => {
      if (showFolderContentAnimation.began) {
        showFolderContentAnimation.reverse();
        if (
          showFolderContentAnimation.progress === 100 &&
          showFolderContentAnimation.direction === "reverse"
        ) {
          showFolderContentAnimation.completed = false;
        }
      }

      if (showFolderContentAnimation.paused) {
        showFolderContentAnimation.play();
      }
    });

    return () => {
      toggleFolder.removeEventListener("click", () => {});
    };
  }, []);
  return (
    <div className="folder-cus-container">
      <div className="folder" id="js_folder">
        <div
          className="folder-summary"
          ref={toggleFolderRef}
          id="js_toggle-folder"
        >
          <div className="folder-summary__start">
            <button
              className="folder-collapse-button"
              id="js_folder-collapse-button"
            >
              <svg
                id="js_folder-collapse-button-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevron-up"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
            <div
              className="folder-summary__file-count"
              id="js_folder-summary-amount"
            >
              <span className="folder-summary__file-count__amount">3</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-folder"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
          </div>
          <div className="folder-summary__details">
            <div className="folder-summary__details__name">Portfolio</div>
            <div className="folder-summary__details__share">
              Design by
              <a
                className="shared-user"
                href="https://dribbble.com/7ahang"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="shared-user__avatar"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="12" fill="#1C213E" />
                  <circle cx="12" cy="12" fill="#BFBFC0" r="6.168" />
                  <circle
                    cx="12.561"
                    cy="11.439"
                    r="5.607"
                    fill="url(#paint0_radial)"
                    fillOpacity=".5"
                  />
                  <defs>
                    <radialGradient
                      id="paint0_radial"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="rotate(109.486 3.244 10.282) scale(7.73263)"
                    >
                      <stop stopColor="#758EA9" />
                      <stop offset="1" stopColor="#668097" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
                <span className="shared-user__name">7ahang</span>
              </a>
            </div>
          </div>
          <div className="folder-summary__end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
            </svg>
          </div>
        </div>

        <ul className="folder-content !mb-0" id="js_folder-content">
          <li className="folder-item js_folder-item">
            <div className="folder-item__icon">
              <svg
                width="50"
                height="70"
                viewBox="0 0 50 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M33 0H5a5 5 0 00-5 5v60a5 5 0 005 5h40a5 5 0 005-5V17L33 0z"
                  fill="#5085E8"
                />
                <path
                  d="M50 29L35 16l15 .867V29z"
                  fill="url(#paint0_linear)"
                  opacity=".1"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M33 0l17 17H38a5 5 0 01-5-5V0z"
                  fill="#A4BEF6"
                />
                <path
                  fill="#fff"
                  fillOpacity=".75"
                  d="M13 39h24v3H13zM13 57h17v3H13zM13 51h24v3H13zM13 45h24v3H13z"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="42.5"
                    y1="16"
                    x2="42.5"
                    y2="29"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop />
                    <stop offset="1" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="folder-item__details">
              <div className="folder-item__details__name">
                Graduate-reports.doc
              </div>
              <div className="folder-item__details__date">
                Created 2020.4.25
              </div>
            </div>
            <div className="folder-item__size">16.7 MB</div>
          </li>

          <li className="folder-item js_folder-item">
            <div className="folder-item__icon">
              <svg
                width="50"
                height="70"
                viewBox="0 0 50 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M33 0H5a5 5 0 00-5 5v60a5 5 0 005 5h40a5 5 0 005-5V17L33 0z"
                  fill="#36A95E"
                />
                <path
                  d="M50 29L35 16l15 .867V29z"
                  fill="url(#paint0_linear)"
                  opacity=".1"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M33 0l17 17H38a5 5 0 01-5-5V0z"
                  fill="#A0D0B3"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 60V39h25v21H12zm14-3h8v-3h-8v3zm-3-3v3h-8v-3h8zm3-3h8v-3h-8v3zm-3-3v3h-8v-3h8zm3-3h8v-3h-8v3zm-3-3v3h-8v-3h8z"
                  fill="#fff"
                  fillOpacity=".75"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="42.5"
                    y1="16"
                    x2="42.5"
                    y2="29"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop />
                    <stop offset="1" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="folder-item__details">
              <div className="folder-item__details__name">
                Festival Visual Design.xlsx
              </div>
              <div className="folder-item__details__date">
                Created 2020.5.17
              </div>
            </div>
            <div className="folder-item__size">216.5 MB</div>
          </li>
          <li className="folder-item js_folder-item">
            <div className="folder-item__icon">
              <svg
                width="50"
                height="70"
                viewBox="0 0 50 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M33 0H5a5 5 0 00-5 5v60a5 5 0 005 5h40a5 5 0 005-5V17L33 0z"
                  fill="#E8B52C"
                />
                <path
                  d="M50 29L35 16l15 .867V29z"
                  fill="url(#paint0_linear)"
                  opacity=".1"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M33 0l17 17H38a5 5 0 01-5-5V0z"
                  fill="#EEDA86"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M34 39H13v21h24V39h-3zM16 54.75h18v-10.5H16v10.5z"
                  fill="#fff"
                  fillOpacity=".75"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="42.5"
                    y1="16"
                    x2="42.5"
                    y2="29"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop />
                    <stop offset="1" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="folder-item__details">
              <div className="folder-item__details__name">
                Portfolio 2020.ppt
              </div>
              <div className="folder-item__details__date">Created 2020.6.7</div>
            </div>
            <div className="folder-item__size">25.8 MB</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Test;
