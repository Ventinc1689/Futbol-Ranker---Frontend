import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../service/AuthContext.jsx'

const Profile = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth(); 

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div>
            <button className="text-white button-background mt-25 ml-30" onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default Profile
