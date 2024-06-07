import React, { useEffect, useState } from 'react';
import '../assets/style/products.css';
import CartSidebar from "./CartSidebar.jsx";

const Products = ({ isCartOpen, setIsCartOpen }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [orderId, setOrderId] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = async (productId) => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            console.error('User is not authenticated');
            return;
        }

        const productData = {
            productId: productId,
            quantity: 1
        };

        try {
            const response = await fetch('http://localhost:8000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(productData)
            });

            //call here fetchProducts();

            if (!response.ok) {
                throw new Error('Failed to add product to cart');
            }
            await response.json();
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    useEffect(() => {
        if (cart.length === 0) {
            const authToken = localStorage.getItem('authToken');
            if (authToken) {
                fetch('http://localhost:8000/api/orders/current', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.items) {
                            setCart(data.items.map(item => ({
                                productId: item.product.id,
                                quantity: item.quantity
                            })));
                            setOrderId(data.id);
                        }
                    })
                    .catch(error => console.error('Error fetching current order:', error));
            }
        }
    }, [cart]);

    return (
        <div className="products-container">
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="bg-gray-800 rounded-lg p-4 text-white h-64 w-64 flex flex-col justify-center items-center">
                        <img src={product.image} alt={product.title} className="w-full h-32 object-cover rounded-lg" />
                        <div className="product-info">
                            <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                            <p className="text-green-500 mb-2 text-sm">{product.price} €</p>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm" onClick={() => addToCart(product.id)}>
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <CartSidebar
                cart={cart}
                setCart={setCart}
                products={products}
                orderId={orderId}
                setIsCartOpen={setIsCartOpen}
            />
        </div>
    );
};

export default Products;
