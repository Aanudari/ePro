// import axios from "axios";
// import { useStateContext } from "../contexts/ContextProvider";
// const {TOKEN} = useStateContext();
// export const fetchUsers = async () => {
//   const response = await axios.get("http://localhost:3000/products", {
//     headers: {
//       "Authorization": `${TOKEN}`,
//       "Content-Type": "application/json",
//   }
//   });
//   const users = response.data;
//   return users;
// };
// const { isError, isSuccess, isLoading, data, error } = useQuery(
//     ["products"],
//     fetchProducts,
//     { staleTime: 3000 }
//   );

