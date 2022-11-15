import {getCategoryPool} from "../../../service/examService"
import Loading from "../../../components/Loading";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
function CategoryPool() {
    const navigate = useNavigate();
    const { isError, isSuccess, isLoading, data, error } = useQuery(
        ["levelOneOperators"],
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
    return ( 
        <div>
            afmepamfpeampk
        </div>
     );
}

export default CategoryPool;