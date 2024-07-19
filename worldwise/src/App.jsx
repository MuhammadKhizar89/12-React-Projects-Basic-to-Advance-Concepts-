import {BrowserRouter, Navigate} from "react-router-dom";
import Home from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import {Routes, Route} from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from"./pages/AppLayout"
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
const Base_URl="http://localhost:9000"
function App() {
const [cities,setCities]=useState([]);
const [isLoading,setIsLoading]=useState(false);
useEffect(()=>{
    async function fetchCities() {
      try{  setIsLoading(true);
        const response = await fetch(`${Base_URl}/cities`);
        const data = await response.json();
        setCities(data);
        setIsLoading(false);
    }catch {
        alert("Something went wrong")
    }
    finally{
        setIsLoading(false);
    }
}
    fetchCities();
},[])

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="product" element={<Product />} />
                    <Route path="pricing" element={<Pricing />} />
                    <Route path="login" element={<Login />} />
                    <Route path="app" element={<AppLayout/>}>
                    <Route index element={<Navigate replace to="cities" />} />
                      <Route path="cities" element={<CityList isLoading={isLoading} cities={cities}/>} />
                      <Route path="cities/:id" element={<City/>} />
                      <Route path="countries" element={<CountryList isLoading={isLoading} cities={cities}/>} />
                      <Route path="form" element={<Form/>} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
