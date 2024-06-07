import {useState} from 'react';
import {Link} from 'react-router-dom';
import {FaEye, FaEyeSlash} from "react-icons/fa";

const Register = () => {
    const [firstNameFocused, setFirstNameFocused] = useState(false);
    const [lastNameFocused, setLastNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }

        const dataToSend = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        };

        try {
            const response = await fetch('http://localhost:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            localStorage.setItem('registerSuccess', 'Votre inscription a été réussie. Veuillez vous connecter.');
            window.location.href = '/login';
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="h-[calc(100vh-6rem)] flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Inscription</h2>
                <form>
                    <div className="mb-4 relative">
                        <input
                            type="text"
                            id="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${
                                firstNameFocused ? 'border-b-2' : ''
                            }`}
                            required
                            onFocus={() => setLastNameFocused(true)}
                            onBlur={(e) => setLastNameFocused(e.target.value !== '')}
                        />
                        <label
                            htmlFor="lastName"
                            className={`absolute left-3 transition-all duration-300 ${
                                lastNameFocused ? 'text-gray-400 text-sm -top-3' : 'text-gray-500 text-base top-2'
                            }`}
                        >
                            Nom
                        </label>
                    </div>
                    <div className="mb-4 relative">
                        <input
                            type="text"
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${
                                firstNameFocused ? 'border-b-2' : ''
                            }`}
                            required
                            onFocus={() => setFirstNameFocused(true)}
                            onBlur={(e) => setFirstNameFocused(e.target.value !== '')}
                        />
                        <label
                            htmlFor="firstName"
                            className={`absolute left-3 transition-all duration-300 ${
                                firstNameFocused ? 'text-gray-400 text-sm -top-3' : 'text-gray-500 text-base top-2'
                            }`}
                        >
                            Prénom
                        </label>
                    </div>
                    <div className="mb-8 relative">
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
                            {passwordVisible ? <FaEyeSlash className="text-gray-500 text-lg"/> :
                                <FaEye className="text-gray-500 text-lg"/>}
                        </div>
                    </div>
                    <div className="mb-4 relative">
                        <input
                            type={confirmPasswordVisible ? 'text' : 'password'}
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${
                                confirmPasswordFocused ? 'border-b-2' : ''
                            }`}
                            required
                            onFocus={() => setConfirmPasswordFocused(true)}
                            onBlur={(e) => setConfirmPasswordFocused(e.target.value !== '')}
                        />
                        <label
                            htmlFor="confirmPassword"
                            className={`absolute left-3 transition-all duration-300 ${
                                confirmPasswordFocused ? 'text-gray-400 text-sm -top-3' : 'text-gray-500 text-base top-2'
                            }`}
                        >
                            Confirmer le mot de passe
                        </label>
                        <div
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {confirmPasswordVisible ? <FaEyeSlash className="text-gray-500 text-lg"/> :
                                <FaEye className="text-gray-500 text-lg"/>}
                        </div>
                    </div>
                    <div className="flex items-center justify-center mb-6">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="bg-teal-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                            S'inscrire
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
