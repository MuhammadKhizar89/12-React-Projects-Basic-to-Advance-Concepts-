import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function Protect({children}) {
    const {isAuthenticated}=useAuth();
    const navigate=useNavigate();
    useEffect(() => {
        console.log(isAuthenticated);
        if (!isAuthenticated) {
            navigate("/login");
        }
    },[isAuthenticated, navigate]);
    

    return isAuthenticated?children:null;
}

export default Protect
