import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import HeussPage from "./pages/HeussPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import {useState} from "react";
import OrderPage from "./pages/OrderPage.jsx";

const App = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/heuss" element={<HeussPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route
                    path="/products"
                    element={<ProductsPage isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>}
                />
                <Route path="/product/:id" element={<ProductPage/>}/>
                <Route path="/order/:orderId" element={<OrderPage/>}/>

            </Routes>
        </BrowserRouter>
    );
};

export default App
