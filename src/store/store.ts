import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch,useSelector } from "react-redux";
import gameReducer from '../features/games/gameSlice'
import accountReducer from '../features/account/accountSlice';



export const store = configureStore({
  reducer: {
    games: gameReducer,
    account: accountReducer
  }
});

//we gonna create 2 types and 2 variables which are very important. One to get state one to dispatch action. 
export type RootState = ReturnType<typeof store.getState>; // this is needed in order to import the state
export type AddDispatch = typeof store.dispatch;  //this is needed to dispatch methods and get changes in the states 

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;