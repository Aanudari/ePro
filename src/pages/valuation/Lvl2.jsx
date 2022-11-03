import React from "react";
import { useQuery } from "react-query";
import Navigation from "../../components/Navigation";
import UserCell from "../../components/sub-components/userCell";
import { fetchComplain } from "../../service/users";
import Loading from "../../components/Loading";
function Level2() {
  const { isError, isSuccess, isLoading, data, error } = useQuery(
    ["complainOperators"],
    fetchComplain,
    { staleTime: 3000 }
  );
  if (isLoading) {
    return <Loading/>;
  }
  return (
    <div className="w-full min-h-screen relative bg-[#23b499]">
    <Navigation />
          <div className="p-2 flex flex-wrap gap-3 justify-around md:justify-start">
        {
          data ? data.result.map((user, index) =>
            // Ажилтан тус бүрийг UserCell conponent д хувиарлах замаар мэдээллүүдийг харуулав
            <UserCell key={index} data={user} />
          ) : 
          <div>
          </div>
        }
          </div>
  </div>
  );
}

export default Level2;
