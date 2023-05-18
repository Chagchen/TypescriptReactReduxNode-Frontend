import React from 'react'
import { useAppSelector } from '../../store/store'
import { Outlet } from 'react-router-dom';
import LoginPage from '../../features/account/LoginPage';

export default function AuthGuard() {
  const {isLoggedIn} = useAppSelector(state => state.account);

  //if user logged in, then user allowed to go where ever. If not he will be routed to the loging page. 
  return isLoggedIn ? <Outlet/> : <LoginPage/>
}
