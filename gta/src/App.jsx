import React from 'react';
import { LoginPage, SignupPage,HomePage } from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';


const App = () => {
  return (


    <>
    <Router>
      <Toaster/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
      </Routes>
    </Router>
    
    </>
  )
}

export default App