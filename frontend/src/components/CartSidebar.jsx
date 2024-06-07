import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

const CartSidebar = ({ cart, setCart, products, setIsCartOpen, orderId }) => {
    const [loading, setLoading] = useState(false);

    const updateQuantity = async (productId, amount) => {
        try {
            setLoading(true);
            const updatedCart = cart.map(item =>
                item.productId === productId
                    ? { ...item, quantity: Math.max(0, item.quantity + amount) } // Ensure quantity is not negative
                    : item
            );

            if (amount < 0) {
                const productToRemove = updatedCart.find(item => item.productId === productId);
                if (productToRemove && productToRemove.quantity === 0) {
                    removeProduct(productId);
                    return;
                }
            }

            setCart(updatedCart);

            // Update quantity in the database
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                console.error('User is not authenticated');
                return;
            }

            const productToUpdate = updatedCart.find(item => item.productId === productId);
            const response = await fetch('http://localhost:8000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({ productId: productToUpdate.productId, quantity: productToUpdate.quantity })
            });

            if (!response.ok) {
                throw new Error('Failed to update quantity in the database');
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeProduct = async (productId) => {
        try {
            setLoading(true);
            const updatedCart = cart.filter(item => item.productId !== productId);
            setCart(updatedCart);

            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                console.error('User is not authenticated');
                return;
            }
            await fetch(`http://localhost:8000/api/orders`, {
                method: 'POST',
                body: JSON.stringify({ productId: productId, quantity: 0 }),
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                }
            });
        } catch (error) {
            console.error('Error removing product:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const product = products.find(p => p.id === item.productId);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    };

    return (
        <div className="cart-sidebar">
            <div className="cart-header mb-5 text-center">
                <h2>Votre Panier</h2>
            </div>
            {cart.length > 0 ? (
                cart.map(item => {
                    const product = products.find(p => p.id === item.productId);
                    return product && (
                        <div key={item.productId} className="cart-item">
                            <img src={product.image} alt={product.title} className="cart-item-image" />
                            <div className="cart-item-info">
                                <h3>{product.title}</h3>
                                <p>{product.price} €</p>
                                <div className="quantity-control">
                                    <button onClick={() => updateQuantity(item.productId, -1)} disabled={loading}><FaMinus /></button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.productId, 1)} disabled={loading}><FaPlus /></button>
                                    <button onClick={() => removeProduct(item.productId)} disabled={loading}><FaTrash /></button>
                                </div>
                            </div>
                            <div className="cart-item-total">
                                <p>{(product.price * item.quantity).toFixed(2)} €</p>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>Votre panier est vide.</p>
            )}
            <div className="cart-footer">
                <h3 className="mb-5">Total produits : {calculateTotal().toFixed(2)} €</h3>
                <Link to={`/order/${orderId}`}
                      className="bg-teal-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 block text-center"
                >
                    Commander
                </Link>
            </div>
        </div>
    );
};

export default CartSidebar;
