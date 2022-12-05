import { useState } from "react";
import {getCategoryPool} from "../../../service/examService"
import Loading from "../../../components/Loading";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import CategoryPoolSelect from "../ExamForm/CategorySelect";
import CategoryPoolSideMenu from "./CategoryPoolSideMenu";
function CategoryPool() {
    const navigate = useNavigate();
    const [showSideMenu, setShowSideMenu] = useState(false);
    const { isError, isSuccess, isLoading, data, error } = useQuery(
        ["getCategoryPool"],
        getCategoryPool,
        { staleTime: 3000}
      );
      const logout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
      }
      if(data && data.errorCode == 401) {
        logout()
      }
      if (isLoading) {
        return <Loading/>;
      }
      let categoryOptions = [];
      data && data.categoryList?.map((item) => (
        categoryOptions.push({ value: `${item.id}`, label: `${item.name}` },)
      ))
    return ( 
        <div className="relative">
                <CategoryPoolSelect options={categoryOptions} 
                showSideMenu={showSideMenu} setShowSideMenu={setShowSideMenu}/>
                 <CategoryPoolSideMenu showSideMenu={showSideMenu} 
                  setShowSideMenu={setShowSideMenu}/>

        </div>
     );
}

export default CategoryPool;