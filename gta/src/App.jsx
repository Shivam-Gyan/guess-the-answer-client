import React from 'react';
import { LoginPage, SignupPage } from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';


const App = () => {
  return (


    <>
    <Router>
      <Toaster/>
      <Routes>
        <Route path="/" element={<h1>Hello</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
      </Routes>
    </Router>
    
    </>
  )
}

export default App