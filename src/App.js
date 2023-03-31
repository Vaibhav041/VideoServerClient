import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import {useSelector} from 'react-redux';
import Register from './components/Register';
import './App.css';
import Video from './components/Video';
import Profile from './components/Profile';
import Settings from './components/Settings';


function App() {

  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/video/:id' element={<Video/>}/>
        <Route path='/login' element={ currentUser ? <Home/> : <Login/>}/>
        <Route path='/register' element={ currentUser ? <Home/> : <Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
