import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../service/AuthContext.jsx'
import Profile from '../../assets/profile.svg'
import Menu from '../../assets/menu.svg'

const TopDisplay = ({ onMenuToggle }) => {
    const { user, isAuthenticated } = useAuth(); 
    const navigate = useNavigate();

    return (
        <nav className="md:ml-22 text-white fixed top-0 w-full z-99 bg-gray-950 text-[14px] px-5 pt-3 md:pt-7 pb-3 md:pb-5 items-center justify-center border-b-2 border-gray-800">
            <div className="flex flex-row items-center">
                <button
                    onClick={onMenuToggle}
                    className="md:hidden mr-2 cursor-pointer"
                >
                    <img 
                        src={Menu}
                        alt="menu"
                        className="h-8 w-8 md:h-10 md:w-10 mr-2 "
                    />
                </button>

                <div className="text-amber-400 font-bold text-[25px] md:text-[30px]">
                    Futbol Ranker
                </div>

                <div className="flex-1 hidden md:block mr-30">
                    <ul className="flex items-center space-x-4 justify-end-safe">
                    {isAuthenticated ? (
                        <div className="flex flex-row items-center space-x-3">
                            <button className="items-center justify-center flex cursor-pointer"
                                onClick={() => navigate('/profile')}
                            >
                                <img 
                                    src={Profile}
                                    alt="profile"
                                    className="h-12 w-12 mr-4"
                                />
                                <p className="text-[20px]">{user?.username} </p>
                            </button>
                        </div>
                    ) : (
                        <button className="text-white button-background" onClick={() => navigate('/signin')}>
                            Log In
                        </button>
                    )}
                    </ul>
                </div>

            </div> 
        </nav>
    )
}

export default TopDisplay
