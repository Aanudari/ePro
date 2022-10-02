import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function SideNavigation() {
  const navigate = useNavigate();
  const { roleId } = useStateContext();
  let location = useLocation();
  let path = location.pathname
  return (
    <div className="w-[375px] relative h-full shadow-cus content">
      <div className="h-full w-[300px] fixed pl-4 pt-4 pr-4 md:overflow-hidden overflow-auto md:hover:overflow-auto">
        <h5 className="cursor-pointer pl-2" onClick={() => {
          navigate("/home");
        }}>
          <svg className="w-[100px] hover:scale-105 transition-all" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 598.11 203.62" fill="#0047ba">
            <defs>
              <style>
                .cls-1
              </style>
            </defs>
            <title>ddish_logo</title>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_3" data-name="Layer 3">
                <path className="cls-1" d="M171.79,0h-140A31.8,31.8,0,0,0,0,31.81v140a31.81,31.81,0,0,0,31.81,31.83h140a31.81,31.81,0,0,0,31.81-31.83v-140A31.8,31.8,0,0,0,171.79,0ZM27.16,153.09c-.18-.16-.36-.31-.52-.47s-.31-.34-.47-.52C19,142.92,38.18,110.62,70,77.78L59.21,65.05a12.68,12.68,0,0,0,5.84-5.84L77.76,70.06c32.84-31.87,65.16-51,74.34-43.91.18.16.36.31.52.47s.31.34.47.52c26.8,27.45,20.58,77.42-14,112S54.59,179.87,27.16,153.09Zm65.9,28.24a25.11,25.11,0,0,1,4.83-9.58,93.86,93.86,0,0,0,22.65-9.34,96,96,0,0,0,27.83-24.11,63.68,63.68,0,0,1,31.7,43Z" />
                <path className="cls-1" d="M143.62,35.62c-7.12-7.12-34.95,9.09-63.41,36.5l21.15,18,.25.2c1.26,1.23-.25,4.76-3.37,7.86s-6.62,4.62-7.88,3.39L72.1,80.2c-27.39,28.46-43.59,56.3-36.48,63.41,7.45,7.45,37.67-10.68,67.5-40.49S151.07,43.1,143.62,35.62Z" />
                <path className="cls-1" d="M273.61,63.64H235.42A6.33,6.33,0,0,0,229.07,70v63.64a6.35,6.35,0,0,0,6.35,6.35h38.18a31.8,31.8,0,0,0,31.81-31.81V95.44A31.8,31.8,0,0,0,273.61,63.64Zm19.08,44.53a19.09,19.09,0,0,1-19.08,19.08H241.78V76.34h31.83a19.1,19.1,0,0,1,19.08,19.1Z" />
                <path className="cls-1" d="M362.67,63.64H324.49A6.35,6.35,0,0,0,318.14,70v63.64a6.36,6.36,0,0,0,6.35,6.35h38.18a31.81,31.81,0,0,0,31.83-31.81V95.44A31.81,31.81,0,0,0,362.67,63.64Zm19.1,44.53a19.1,19.1,0,0,1-19.1,19.08H330.87V76.34h31.81a19.1,19.1,0,0,1,19.1,19.1Z" />
                <rect className="cls-1" x="407.22" y="63.63" width="12.73" height="76.35" />
                <polygon className="cls-1" points="585.38 63.63 585.38 95.44 534.48 95.44 534.48 63.63 521.75 63.63 521.75 95.44 521.75 108.17 521.75 139.98 534.48 139.98 534.48 108.17 585.38 108.17 585.38 139.98 598.11 139.98 598.11 108.17 598.11 95.44 598.11 63.63 585.38 63.63" />
                <path className="cls-1" d="M488.34,95.44h-35a8,8,0,0,1-7.95-7.95V84.31a8,8,0,0,1,7.95-7.95h49.33V63.64H453.34a20.62,20.62,0,0,0-20.67,20.67V87.5a20.62,20.62,0,0,0,20.67,20.67h35a8,8,0,0,1,8,7.95v3.19a8,8,0,0,1-8,7.95H432.67V140h55.67A20.62,20.62,0,0,0,509,119.3v-3.19a20.62,20.62,0,0,0-20.7-20.67Z" />
                <path fill="#e63c2f" className="cls-2" d="M66.35,53.63A12.73,12.73,0,1,1,53.63,40.9,12.64,12.64,0,0,1,66.35,53.63Z" />
              </g>
            </g>
          </svg>

        </h5>
        <h5 className="text-[16px] mt-4 h-6 uppercase text-gray-500">Шалгалт</h5>
        {
          roleId === "199" ?
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

              <span className="ml-1 font-[400]">Шалгалтын форм үүсгэх</span>
            </div> : null
        }
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

          <span className="ml-1 font-[400]">Шалгалт өгөх</span>
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

          <span className="ml-1 font-[400]">Шалгалтын дүн харах</span>
        </div>
        <h5 className="text-[16px] h-6 uppercase text-gray-500 mt-2">Үнэлгээ</h5>
        <div
          onClick={() => {
            navigate("/dashboard");
          }}
          className={
            path == "/dashboard" ?
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

          <span className="ml-1 font-[400]">Хянах самбар</span>
        </div>
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

          <span className="ml-1 font-[400]">LEVEL 1</span>
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

          <span className="ml-1 font-[400]">COMPLAIN</span>
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

          <span className="ml-1 font-[400]">TELESALES</span>
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

          <span className="ml-1 font-[400]">ONLINE</span>
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

          <span className="ml-1 font-[400]">BRANCH</span>
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

          <span className="ml-1 font-[400]">INSTALLER</span>
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

          <span className="ml-1 font-[400]">CARE</span>
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

          <span className="ml-1 font-[400]">BANK</span>
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

          <span className="ml-1 font-[400]">Сургалт төлөвлөх</span>
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

          <span className="ml-1 font-[400]">Сургалтан хамрагдсан</span>
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

          <span className="ml-1 font-[400]">Сургалтууд</span>
        </div>
        <div className="h-10"></div>
      </div>
    </div>
  );
}

export default SideNavigation;
