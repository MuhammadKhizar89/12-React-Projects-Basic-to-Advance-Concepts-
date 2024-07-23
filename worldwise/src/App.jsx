import { lazy, Suspense } from "react";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import {BrowserRouter, Navigate} from "react-router-dom";
import {Routes, Route} from "react-router-dom";

// import Home from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from"./pages/AppLayout"
// import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import Protect from "./pages/Protect";
import SpinnerFullPage from "./components/SpinnerFullPage";
const Home = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"))
const Login = lazy(() => import("./pages/Login"));
function App() {


    return (
            <AuthProvider>
            <CitiesProvider>
            <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="product" element={<Product />} />
                    <Route path="pricing" element={<Pricing />} />
                    <Route path="login" element={<Login />} />
                    <Route  path="app" element={
                        <Protect>
                        <AppLayout/>
                        </Protect>
                        }>
                    <Route index element={<Navigate replace to="cities" />} />
                      <Route path="cities" element={<CityList/>} />
                      <Route path="cities/:id" element={<City/>} />
                      <Route path="countries" element={<CountryList />} />
                      <Route path="form" element={<Form/>} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                </Suspense>
            </BrowserRouter>
            </CitiesProvider>
         </AuthProvider>
    );
}
export default App;
