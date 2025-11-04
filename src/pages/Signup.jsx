import React, { useState, useEffect } from 'react'
import User from '../assets/user.svg'
import Password from '../assets/password.svg'
import Email from '../assets/email.svg'
import { authService } from '../service/authService.jsx'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../service/AuthContext.jsx'

const Signup = () => {
    const navigate = useNavigate();
    const { register, isAuthenticated } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        full_name: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const result = await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                fullName: formData.full_name
            });
            
            if (result.success) {
                setSuccess('Registration successful! Please log in.');
                setIsLogin(true);
                setFormData({ username: '', email: '', password: '', full_name: '' });
            } else {
                setError(result.error);
            }
        } catch (e) {
            console.error('Error details:', e);
            setError(`An unexpected error occurred. ${e}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center md:ml-25 md:mt-8">
            <div className="w-full max-w-[420px] md:max-w-2xl lg:max-w-4xl bg-white rounded-3xl shadow-md p-6 text-black border-5 border-amber-500">
                <h1 className="text-[30px] font-bold mb-1 text-center">Hello, Welcome!</h1>
                <h2 className="text-[18px] mb-4 text-center">Create a new account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-gray-700 block text-sm font-semibold">
                            Full Name
                        </label>
                        <div className="relative">
                            <input 
                                type="text"
                                name="full_name"
                                placeholder="Full Name"
                                value={formData.full_name}
                                onChange={handleInputChange}
                                className="text-black w-full border-gray-200 p-2 md:p-3 md:pl-12 pl-12 border-2 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                required
                            />
                            <img 
                                src={User}
                                alt="user"
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-gray-700 block text-sm font-semibold">
                            Username
                        </label>
                        <div className="relative">
                            <input 
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="text-black w-full border-gray-200 p-2 md:p-3 md:pl-12 pl-12 border-2 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                required
                            />
                            <img 
                                src={User}
                                alt="user"
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-700 block text-sm font-semibold">
                            Email
                        </label>
                        <div className="relative">
                            <input 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                className="text-black w-full border-gray-200 p-2 md:p-3 md:pl-12 pl-12 border-2 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                required
                            />
                            <img 
                                src={Email}
                                alt="email"
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-700 block text-sm font-semibold">
                            Password
                        </label>
                        <div className="relative">
                            <input 
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                className="text-black w-full border-gray-200 p-2 md:p-3 md:pl-12 pl-12 border-2 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                                required
                            />
                            <img 
                                src={Password}
                                alt="password"
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                            />
                        </div>
                    </div>

                    {/* Error and Success Messages */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {success}
                        </div>
                    )}

                    <button type="submit" className="w-full button-background font-semibold">
                        Register
                    </button>
                    
                </form>

                <p className="mt-4 text-center text-md text-gray-600">
                    Already have an account?{' '}
                    <a 
                        href="/signin" 
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Signup
