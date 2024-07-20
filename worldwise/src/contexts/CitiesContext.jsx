import {useContext} from "react";
import {createContext} from "react";
import {useEffect, useState} from "react";
const CitiesContext = createContext();
const Base_URl = "http://localhost:9000";

function CitiesProvider({children}) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});
    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const response = await fetch(`${Base_URl}/cities`);
                const data = await response.json();
                setCities(data);
                setIsLoading(false);
            } catch {
                alert("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);
    async function getCity(id) {
        try {
            setIsLoading(true);
            const response = await fetch(`${Base_URl}/cities/${id}`);
            const data = await response.json();
            setCurrentCity(data);
            setIsLoading(false);
        } catch {
            alert("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }
    async function createCity(newCity) {
        try {
            setIsLoading(true);
            const response = await fetch(`${Base_URl}/cities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCity),
            });
            const data = await response.json();
            setCities([...cities, data]);
        } catch {
            alert("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }
    async function deleteCity(id) {
        try {
            setIsLoading(true);
            const response = await fetch(`${Base_URl}/cities/${id}`, {
                method: "DELETE",
            });
            setCities((cities)=>cities.filter((city)=>city.id!==id));
        } catch {
            alert("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
                createCity,
                deleteCity,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}
function useCities() {
    const x = useContext(CitiesContext);
    return x;
}
export {CitiesProvider, useCities};
