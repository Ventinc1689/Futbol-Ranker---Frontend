import React, { useState, useEffect } from 'react'
import User from '../assets/user.svg'
import Password from '../assets/password.svg'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../service/AuthContext.jsx'

const Signin = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
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
            const result = await login({
                username: formData.username,
                password: formData.password
            });
                
            if (result.success) {
                setSuccess('Login successful!');
                setTimeout(() => {
                    navigate('/');
                }, 1500);
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
            <div className="w-full max-w-[420px] md:max-w-2xl lg:max-w-4xl bg-white rounded-3xl shadow-md p-8 text-black border-5 border-amber-500">
                <h1 className="text-[30px] font-bold mb-2 text-center">Welcome Back!</h1>
                <h2 className="text-[18px] mb-6 text-center">Log in to your account</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-gray-700 block text-sm font-semibold">
                            Email/Username
                        </label>
                        <div className="relative">
                            <input 
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Email/Username"
                                className="text-black w-full border-gray-200 p-2 md:p-4 pl-12 md:pl-12 border-2 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
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
                            Password
                        </label>
                        <div className="relative">
                            <input 
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                className="text-black w-full border-gray-200 p-2 md:p-4 pl-12 md:pl-12 border-2 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
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

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">Forgot password?</a>
                    </div>

                    <button type="submit" className="w-full button-background font-semibold">
                        Sign In
                    </button>
                    
                </form>

                <p className="mt-6 text-center text-md text-gray-600">
                    Don't have an account?{' '}
                    <a 
                        href="/signup" 
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Signin
