import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listner=true) {
    const ref = useRef();
    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                handler();
            }
        }
        document.addEventListener("click", handleClick,listner);
        return () => document.removeEventListener("click", handleClick, listner);
    }, [handler,listner]);

return ref;

}