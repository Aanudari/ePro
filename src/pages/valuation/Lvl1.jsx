import React from "react";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import axios from "axios";
import UserCell from "../../components/sub-components/userCell";
import ExpandedMenu from "../../components/ExpandedMenu";
import { useStateContext } from "../../contexts/ContextProvider";
import { fetchLevelOne } from "../../service/users";
import Loading from "../../components/Loading";
import { useQuery } from "react-query";
function Level1() {
  const { expandedMenu, setExpandedMenu } = useStateContext()
  const { isError, isSuccess, isLoading, data, error } = useQuery(
    ["levelOneOperators"],
    fetchLevelOne,
    { staleTime: 3000 }
  );
  if (isLoading) {
    return <Loading/>;
  }
  return (
    <div className="w-full min-h-screen relative bg-[#23b499]">
      <ExpandedMenu />
      <Navigation />
            <div onClick={() => {
              setExpandedMenu(!expandedMenu)
            }} className="px-2 py-2 bg-gray-200 transition cursor-pointer ">
              <i className="bi bi-arrow-bar-left text-[25px]"></i>
            </div>
            <div className="p-2 flex flex-wrap gap-3 justify-around md:justify-start">
          {
            data ? data.result.map((user, index) =>
              // Ажилтан тус бүрийг UserCell conponent д хувиарлах замаар мэдээллүүдийг харуулав
              <UserCell key={index} data={user} />
            ) : null
          }
            </div>

    </div>
  );
}

export default Level1;
