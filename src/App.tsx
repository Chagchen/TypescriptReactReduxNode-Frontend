import React, { useCallback, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GamesPage from './features/games/GamesPage';
import gameSlice, { getGames } from './features/games/gameSlice';
import { useAppDispatch } from './store/store';
import NavBar from './components/layout/NavBar';
import SingleGamePage from './features/games/SingleGamePage';
import CreateGamePage from './features/games/CreateGamePage';
import EditGamePage from './features/games/EditGamePage';
import LoginPage from './features/account/LoginPage';
import { Input } from '@mui/joy';
import { ToastContainer } from 'react-toastify';
import { getCurrentUser } from './features/account/accountSlice';
import 'react-toastify/dist/ReactToastify.css';
import AuthGuard from './components/guards/AuthGuard';




function App() {
  const React = require('react');
  const dispatch = useAppDispatch();

  const initApp = useCallback(async()=>{
    await dispatch(getGames());
    await dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(()=> {
    initApp();
    // eslint-disable-next-line
  }, [])

  return (
    <BrowserRouter>
    <ToastContainer/>
    <NavBar/>
      <Routes>
        <Route path="/" element={<GamesPage/>} />
        <Route path="/game/:id" element={<SingleGamePage/>} />
        <Route element={<AuthGuard/>}>
          <Route path="/creategame" element={<CreateGamePage/>} />
          <Route path="/editgame/:id" element={<EditGamePage/>} />
        </Route>
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
