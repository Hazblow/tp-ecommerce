import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const message = localStorage.getItem('registerSuccess');
        if (message) {
            setSuccessMessage(message);
            localStorage.removeItem('registerSuccess');

            setTimeout(() => {
                setSuccessMessage('');
            }, 8000);
        }
    }, []);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);

            localStorage.setItem('authToken', data.access_token);
            localStorage.setItem('loginSuccess', 'Connexion reussie');
            window.location.href = '/profile';
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="h-[calc(100vh-6rem)] flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
                {successMessage && (
                    <div className="bg-green-500 text-white p-3 rounded mb-4 text-center">
                        {successMessage}
                    </div>
                )}
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Connexion</h2>
                <form>
                    <div className="mb-4 relative">
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${
                                emailFocused ? 'border-b-2' : ''
                            }`}
                            required
                            onFocus={() => setEmailFocused(true)}
                            onBlur={(e) => setEmailFocused(e.target.value !== '')}
                        />
                        <label
                            htmlFor="email"
                            className={`absolute left-3 transition-all duration-300 ${
                                emailFocused ? 'text-gray-400 text-sm -top-3' : 'text-gray-500 text-base top-2'
                            }`}
                        >
                            Email
                        </label>
                    </div>
                    <div className="mb-4 relative">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${
                                passwordFocused ? 'border-b-2' : ''
                            }`}
                            required
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={(e) => setPasswordFocused(e.target.value !== '')}
                        />
                        <label
                            htmlFor="password"
                            className={`absolute left-3 transition-all duration-300 ${
                                passwordFocused ? 'text-gray-400 text-sm -top-3' : 'text-gray-500 text-base top-2'
                            }`}
                        >
                            Mot de passe
                        </label>
                        <div
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? <FaEyeSlash className="text-gray-500 text-lg" /> : <FaEye className="text-gray-500 text-lg" />}
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <a href="#" className="text-sm text-teal-400 hover:underline">
                            Mot de passe oublié?
                        </a>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="bg-teal-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                            Se connecter
                        </button>
                    </div>
                </form>
                <div className="text-center text-sm">
                    <p>
                        Vous n'avez pas encore de compte?{' '}
                        <Link to="/register" className="text-teal-400 hover:underline">
                            S'inscrire
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Login;