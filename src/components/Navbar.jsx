import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../service/AuthContext.jsx'
import Logo from '../../public/logo.svg'
import Home from '../assets/home.svg'
import Ranking from '../assets/ranking.svg'
import MyRankings from '../assets/linechart.svg'
import Contact from '../assets/contact.svg'
import Person from '../assets/person.svg'

const Navbar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth(); 

  return (
    <>
      <nav className="text-white fixed top-0 left-0 w-[110px] h-full z-100 bg-gray-950 text-[14px] hidden md:block">
        <div className="flex flex-col items-center">
          <div className="items-start pt-2 text-[24px] font-bold cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src={Logo}
              alt="logo"
              className="h-18 w-18 mb-6"
            />
          </div>

          <div className="">
            <ul className="cursor-pointer items-center flex flex-col space-y-5">
              <li onClick={() => navigate('/')}>
                <div className="flex flex-col text-center">
                  <img 
                    src={Home}
                    alt="home"
                    className="h-13 w-13 mb-1 bg-gray-800 rounded-2xl p-2"
                  />
                  <p className="">Home</p>
                </div>
              </li>
              <li onClick={() => navigate('/communityranking')}>
                <div className="flex flex-col text-center">
                  <img 
                    src={Ranking}
                    alt="ranking"
                    className="h-13 w-13 mb-1 bg-gray-800 rounded-2xl p-2 "
                  />
                  <p className="">Ranking</p>
                </div>
              </li>
              <li onClick={() => navigate('/myrankings')}>
                <div className="flex flex-col text-center items-center">
                  <img 
                    src={MyRankings}
                    alt="my_rankings"
                    className="h-13 w-13 mb-1 bg-gray-800 rounded-2xl p-2 "
                  />
                  <p className="">My Rankings</p>
                </div>
              </li>
              <li>
                <div className="flex flex-col text-center items-center">
                  <img 
                    src={Contact}
                    alt="contact"
                    className="h-13 w-13 mb-1 bg-gray-800 rounded-2xl p-2 "
                  />
                  <p className="">Contact</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Only visible on mobile when open */}
      {isOpen && (
        <div className="fixed inset-0 z-[200] md:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-60"
            onClick={onClose}
          />

          <div className="fixed top-0 left-0 h-full text-white w-full bg-gray-950 bg-opacity-90 backdrop-blur-lg">
            <div className="flex flex-col p-2">
              <div className="flex flex-row items-center px-2 mb-10 h-[100px]">
                <div className="flex-1 flex mt-3 items-start text-[24px] font-bold" >
                  <img 
                    src={Logo}
                    alt="logo"
                    className="h-20 w-20"
                  />
                </div>

                <p className="flex flex-2 items-center h-full justify-center text-amber-400 font-bold text-[26px] pt-4 ml-4">Futbol Ranker</p>

                <button className="flex flex-1 justify-end pt-3 text-white text-[30px] mr-2" onClick={onClose}>
                  x
                </button>
              </div>

              {/* Menu Items */}
              <nav className="w-full px-14">
                <ul className="cursor-pointer items-center flex-row justify-center gap-8 text-[14px] flex overflow-auto disabled:scroll flex-wrap">
                  <li onClick={() => { navigate('/'); onClose(); }}>
                    <div className="flex flex-col items-center justify-center h-25 w-20">
                      <img 
                        src={Home}
                        alt="home"
                        className="h-14 w-14 mb-1 bg-gray-800 rounded-2xl p-2"
                      />
                      <p className="">Home</p>
                    </div>
                  </li>
                  <li onClick={() => {navigate('/communityranking'); onClose();}}>
                    <div className="flex flex-col items-center justify-center h-25 w-20">
                      <img 
                        src={Ranking}
                        alt="ranking"
                        className="h-14 w-14 mb-1 bg-gray-800 rounded-2xl p-2 "
                      />
                      <p className="">Ranking</p>
                    </div>
                  </li>
                  <li onClick={() => {navigate('/myrankings'); onClose();}}>
                    <div className="flex flex-col items-center justify-center h-25 w-20">
                      <img 
                        src={MyRankings}
                        alt="my_rankings"
                        className="h-14 w-14 mb-1 bg-gray-800 rounded-2xl p-2 "
                      />
                      <p className="">My Ranking</p>
                    </div>
                  </li>
                  <li onClick={() => {
                    if (isAuthenticated) {
                      navigate('/profile');
                    } else {
                      navigate('/signin');
                    }
                    onClose();
                  }}>
                    <div className="flex flex-col items-center justify-center h-25 w-20">
                      <img 
                        src={Person}
                        alt="person"
                        className="h-14 w-14 mb-1 bg-gray-800 rounded-2xl p-2"
                      />
                      <p className="">{isAuthenticated ? 'My Account' : 'Login'}</p>
                    </div>
                  </li>
                  <li>
                    <div className="flex flex-col items-center justify-center h-25 w-20">
                      <img 
                        src={Contact}
                        alt="contact"
                        className="h-14 w-14 mb-1 bg-gray-800 rounded-2xl p-2"
                      />
                      <p className="">Contact</p>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
