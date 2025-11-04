import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './service/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import TopDisplay from './components/rankings/TopDisplay.jsx'
import Hero from './components/Hero.jsx'
import Profile from './pages/Profile.jsx'
import MyRankings from './pages/MyRankings.jsx'
import CommunityRankings from './pages/CommunityRankings.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  }

  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar 
            isOpen={isMobileMenuOpen}
            onClose={closeMobileMenu}
          />
          <TopDisplay onMenuToggle={toggleMobileMenu} />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myrankings" element={<MyRankings />} />
            <Route path="/communityranking" element={<CommunityRankings />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

