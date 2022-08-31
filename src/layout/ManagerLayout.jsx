import { useStateContext } from "../contexts/ContextProvider";

function ManagerLayout(children) {
    const { roleId } = useStateContext();
    return ( 
        <>
            {roleId === "2" && "6" ? children : null}
        </>
     );
}

export default ManagerLayout;