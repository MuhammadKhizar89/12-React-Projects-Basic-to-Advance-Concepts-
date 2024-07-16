import { useState,useEffect } from "react";
export function useLocalStorageState(defaultValue, key) {
    const [value, setValue] = useState(function () {
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : defaultValue;
      });

      useEffect(function () {
        localStorage.setItem(key, JSON.stringify(value));
      }, [value,key])
    
return [value, setValue];
}