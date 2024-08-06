import {useEffect} from "react";
import {useUser} from "../features/authentication/useUser";
import Spinner from "./Spinner";
import {useNavigate} from "react-router-dom";

function ProtectedRoute({children}) {
    const navigate = useNavigate();
    const {isPending, isAuthenticated} = useUser();
    useEffect(() => {
        if (!isAuthenticated && !isPending) navigate("/login");
    },[isAuthenticated,isPending,navigate]);

    if (isPending) return <Spinner />;
     if(isAuthenticated)return <div>{children}</div>;
}

export default ProtectedRoute;
