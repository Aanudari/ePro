import { useStateContext } from "../contexts/ContextProvider";
const AdminLayout = ({ children }) => {
    const { roleId } = useStateContext();
    return (
        <>
            {roleId === "199" ? children : null}
        </>
    )
}

export default AdminLayout