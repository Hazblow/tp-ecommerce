import Header from "../components/Header.jsx";
import Products from "../components/Products.jsx";

const ProductsPage = ({ isCartOpen, setIsCartOpen }) => {

    return (
        <div>
            <Header />
            <Products isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        </div>
    );
};

export default ProductsPage;