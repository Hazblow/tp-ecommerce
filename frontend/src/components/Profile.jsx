import {useEffect, useState} from "react";

const Profile = () => {
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const message = localStorage.getItem('loginSuccess');
        if (message) {
            setSuccessMessage(message);
            localStorage.removeItem('loginSuccess');

            setTimeout(() => {
                setSuccessMessage('');
            }, 8000);
        }
    }, []);


    return  (
        <div>
            {successMessage && (
                <div className="bg-green-500 text-white p-3 rounded mb-4 text-center">
                    {successMessage}
                </div>
            )}
            Profil
        </div>
    )
}

export default Profile