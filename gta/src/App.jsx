import React from 'react';
import { LoginPage, SignupPage, HomePage, ProfilePage,QuizCreatorPage } from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './utils';
import { PageNotFound } from './common';


const App = () => {
  return (
    <>
      <Router>
        <Toaster />
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path='/dashboard'>
              <Route path="/dashboard/profile" element={<ProfilePage />} />
            </Route>
            <Route path='/setting'>
              <Route path="/setting/edit-profile" element={<ProfilePage />} />
            </Route>
            <Route path="/create-quiz" element={<QuizCreatorPage/>}/>
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Router>

    </>
  )
}

export default App