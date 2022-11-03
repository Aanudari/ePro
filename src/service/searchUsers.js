import axios from "axios";

export const fetchUsers = async () => {
  console.log("Fetching products");
  const response = await axios.get("http://localhost:3000/products");
  const users = response.data;
  return users;
};
const { isError, isSuccess, isLoading, data, error } = useQuery(
    ["products"],
    fetchProducts,
    { staleTime: 3000 }
  );
