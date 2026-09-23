import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogHome from './pages/BlogHome';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/verify-email' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/blog' element={<BlogHome />} />
        <Route path='/blog/create' element={<CreatePost />} />
        <Route path='/blog/edit/:id' element={<EditPost />} />
        <Route path='/blog/:id' element={<PostDetail />} />
      </Routes>
    </div>
  );
};

export default App;