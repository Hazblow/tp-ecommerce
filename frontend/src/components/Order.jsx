import {useState} from "react";
import {Link, useParams} from "react-router-dom";

const Order = () => {
    const { orderId } = useParams();
    const [shippingAddress, setShippingAddress] = useState('');
    const [shippingMethod, setShippingMethod] = useState('');
    const [billingAddress, setBillingAddress] = useState('');

    const handleShippingSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/orders/${orderId}/shipping`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ shippingAddress: shippingAddress, shippingMethod: shippingMethod })
            });
            if (!response.ok) {
                throw new Error('Failed to submit shipping address');
            }
            // Handle success
        } catch (error) {
            console.error('Error submitting shipping address:', error);
        }
    };

    const handleBillingSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/orders/${orderId}/invoice-address`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ invoiceAddress: billingAddress })
            });
            if (!response.ok) {
                throw new Error('Failed to submit billing address');
            }
            // Handle success
        } catch (error) {
            console.error('Error submitting billing address:', error);
        }
    };

    const handlePayOrder = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/orders/${orderId}/pay`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to pay order');
            }
            // Handle success
        } catch (error) {
            console.error('Error paying order:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-80">
                <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                <form onSubmit={handleShippingSubmit}>
                    <div className="mb-4">
                        <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700">Shipping
                            Address:</label>
                        <input id="shippingAddress" type="text" value={shippingAddress}
                               onChange={(e) => setShippingAddress(e.target.value)}
                               className="mt-1 p-2 border rounded-md w-full"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="shippingMethod" className="block text-sm font-medium text-gray-700">Shipping
                            Method:</label>
                        <input id="shippingMethod" type="text" value={shippingMethod}
                               onChange={(e) => setShippingMethod(e.target.value)}
                               className="mt-1 p-2 border rounded-md w-full"/>
                    </div>
                    <button type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit
                    </button>
                </form>

                <h2 className="text-lg font-semibold my-4">Billing Address</h2>
                <form onSubmit={handleBillingSubmit}>
                    <div className="mb-4">
                        <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700">Billing
                            Address:</label>
                        <input id="billingAddress" type="text" value={billingAddress}
                               onChange={(e) => setBillingAddress(e.target.value)}
                               className="mt-1 p-2 border rounded-md w-full"/>
                    </div>
                    <button type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit
                    </button>
                </form>

                <button onClick={handlePayOrder}
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Payer la commande
                </button>
            </div>
        </div>
    );
};

export default Order;