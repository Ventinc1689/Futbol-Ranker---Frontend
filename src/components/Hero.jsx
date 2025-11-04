import React from 'react'
import Cr7 from '../assets/cr7.jpg'
import Messi from '../assets/messi.webp'
import Maradona from '../assets/maradona.webp'
import Pele from '../assets/pele.webp'
import Enter from '../assets/enter.png'
import { useAuth } from '../service/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/myrankings');
    } else {
      navigate('/signin');
    }
  }

  return (
    <div className="text-white flex flex-col lg:flex-row min-h-180 md:ml-35 m-10 my-35">

      <div className="flex flex-2 lg:flex-col space-x-4">
        <div className="flex-1 flex lg:justify-end lg:mr-10">
          <img
            src={Messi}
            alt="messi"
            className="object-cover h-[160px] w-[300px] md:h-[200px] md:w-[300px] lg:h-[280px] lg:w-[350px] border-1 border-amber-400 rounded-lg"
          />
        </div>

        <div className="flex-1 flex justify-end lg:mr-10">
          <img 
            src={Maradona}
            alt="maradona"
            className="object-cover h-[160px] w-[300px] md:h-[200px] md:w-[300px] lg:h-[280px] lg:w-[350px] border-1 border-amber-400 rounded-lg"
          />
        </div>
      </div>

      <div className="flex flex-3 ">
        <div className="flex-1 text-center flex-col space-y-5 items-center flex  my-10 lg:mt-35">
          <p className="text-[25px] md:text-[24px] lg:text-[35px] font-bold text-amber-500 lg:mb-15">Welcome to Futbol Ranker</p>
          <p className="text-[18px] lg:text-[25px] font-semibold text-amber-300">Online Platform Ror Ranking Your</p>
          <p className="text-[18px] lg:text-[25px] font-semibold text-amber-300">Top Players,</p>
          <p className="text-[18px] lg:text-[25px] font-semibold text-amber-300">Your GOAT, Your Rankings</p>
          <button 
            className="button-background text-[15px] mt-2"
            onClick={handleGetStarted}
          >
            Get Started
            <img 
              src={Enter}
              alt="enter"
              className="inline-block h-7 w-7 ml-2 mix-blend-multiply"
            />
          </button>
        </div>
      </div>

      <div className="flex flex-2 lg:flex-col space-x-4">
        <div className="flex-1 flex justify-start lg:ml-10">
          <img
            src={Cr7}
            alt="cr7"
            className="object-cover h-[160px] w-[300px] md:h-[200px] md:w-[300px] lg:h-[280px] lg:w-[350px] border-1 border-amber-400 rounded-lg"
          />
        </div>

        <div className="flex-1 flex justify-end lg:justify-start lg:ml-10">
          <img 
            src={Pele}
            alt="pele"
            className="object-cover h-[160px] w-[300px] md:h-[200px] md:w-[300px] lg:h-[280px] lg:w-[350px] border-1 border-amber-400 rounded-lg"
          />
        </div>
      </div>

    </div>
  )
}

export default Hero
