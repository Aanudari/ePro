import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function SideNavigation() {
  const navigate = useNavigate();
  const { sideBarTrack, setSideBarTrack } = useStateContext();
  let location = useLocation();
  let path = location.pathname
  return (
    <div className="w-[375px] relative h-full shadow-cus content">
      <div className="h-full w-[300px] fixed pl-4 pt-4 pr-4 md:overflow-hidden overflow-auto md:hover:overflow-auto">
        <h5 className="cursor-pointer" onClick={() => {
          navigate("/home");
        }}>DDISH</h5>
        <h5 className="text-[16px] mt-4 h-6 uppercase text-gray-500">Шалгалт</h5>
        <div
          onClick={() => {
            navigate("/exam-form");
          }}
          className={
            path == "/exam-form" ?
              "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
              "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
          }
        >
          <div className="w-[15px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-ui-checks"
              viewBox="0 0 16 16"
            >
              <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708l-2 2zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708l-2 2zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
            </svg>{" "}
          </div>

          <span className="ml-1">Шалгалтын форм бэлдэх</span>
        </div>
        <div
          onClick={() => {
            navigate("/take-exam");
          }}
          className={
            path == "/take-exam" ?
              "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
              "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
          }
        >
          <div className="w-[15px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
          </div>

          <span className="ml-1">Шалгалт өгөх</span>
        </div>
        <div
          onClick={() => {
            navigate("/exam-result");
          }}
          className={
            path == "/exam-result" ?
              "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
              "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
          }
        >
          <div className="w-[15px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-info-lg"
              viewBox="0 0 16 16"
            >
              <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z" />
            </svg>{" "}
          </div>

          <span className="ml-1">Шалгалтын дүн харах</span>
        </div>
        <h5 className="text-[16px] h-6 uppercase text-gray-500 mt-2">Үнэлгээ</h5>
        <div
          onClick={() => {
            navigate("/level-one");
          }}
          className={
            path == "/level-one" ?
              "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
              "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
          }
        >
          <div className="w-[15px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-ui-checks"
              viewBox="0 0 16 16"
            >
              <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708l-2 2zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708l-2 2zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
            </svg>{" "}
          </div>

          <span className="ml-1">LEVEL 1</span>
        </div>
        {/* HERE */}
        <div
          onClick={() => {
            navigate("/complain");
          }}
          className={
            path == "/complain" ?
              "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
              "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
          }
        >
          <div className="w-[15px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-list-check"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"
              />
            </svg>{" "}
          </div>

          <span className="ml-1">COMPLAIN</span>
        </div>
        {/* HERE */}
        <div
          onClick={() => {
            navigate("/telesales");
          }}
          className={
            path == "/telesales" ?
              "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
              "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
          }
        >
          <div className="w-[15px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-info-lg"
              viewBox="0 0 16 16"
            >
              <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z" />
            </svg>{" "}
          </div>

          <span className="ml-1">TELESALES</span>
        </div>
        <div
          onClick={() => {
            navigate("/online");
          }}
          className={
            path == "/online" ?
              "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
              "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
          }
        >
          <div className="w-[15px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-info-lg"
              viewBox="0 0 16 16"
            >
              <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z" />
            </svg>{" "}
          </div>

          <span className="ml-1">ONLINE</span>
        </div>
        <div
          onClick={() => {
            navigate("/branch");
          }}
          className={
            path == "/branch" ?
              "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
              "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
          }
        >
          <div className="w-[15px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-info-lg"
              viewBox="0 0 16 16"
            >
              <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z" />
            </svg>{" "}
          </div>

          <span className="ml-1">BRANCH</span>
        </div>
        <div
          onClick={() => {
            navigate("/installer");
          }}
          className={
            path == "/installer" ?
              "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
              "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
          }
        >
          <div className="w-[15px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-info-lg"
              viewBox="0 0 16 16"
            >
              <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z" />
            </svg>{" "}
          </div>

          <span className="ml-1">INSTALLER</span>
        </div>
        <div
          onClick={() => {
            navigate("/care");
          }}
          className={
            path == "/care" ?
              "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
              "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
          }
        >
          <div className="w-[15px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-info-lg"
              viewBox="0 0 16 16"
            >
              <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z" />
            </svg>{" "}
          </div>

          <span className="ml-1">CARE</span>
        </div>
        <div
          onClick={() => {
            navigate("/bank");
          }}
          className={
            path == "/bank" ?
              "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
              "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
          }
        >
          <div className="w-[15px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-exclamation-lg"
              viewBox="0 0 16 16"
            >
              <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0L7.005 3.1ZM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
            </svg>
          </div>

          <span className="ml-1">BANK</span>
        </div>
        <h5 className="text-[16px] h-6 uppercase text-gray-500 mt-2">Сургалт</h5>
        <div
          onClick={() => {
            navigate("/create-training");
          }}
          className={
            path == "/create-training" ?
              "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
              "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
          }
        >
          <div className="w-[15px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-ui-checks"
              viewBox="0 0 16 16"
            >
              <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708l-2 2zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708l-2 2zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
            </svg>{" "}
          </div>

          <span className="ml-1">Сургалт төлөвлөх</span>
        </div>
        <div
          onClick={() => {
            navigate("/took-training");
          }}
          className={
            path == "/took-training" ?
              "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
              "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
          }
        >
          <div className="w-[15px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
          </div>

          <span className="ml-1">Сургалтан хамрагдсан</span>
        </div>
        <div
          onClick={() => {
            navigate("/trainings");
          }}
          className={
            path == "/trainings" ?
              "w-full h-12 cursor-pointer pl-4 flex items-center rounded-md bg-sky-500 text-white font-bold" :
              "w-full h-12 cursor-pointer pl-4 hover:bg-gray-100 flex items-center rounded-md "
          }
        >
          <div className="w-[15px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-info-lg"
              viewBox="0 0 16 16"
            >
              <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z" />
            </svg>{" "}
          </div>

          <span className="ml-1">Сургалтууд</span>
        </div>
      </div>
    </div>
  );
}

export default SideNavigation;
