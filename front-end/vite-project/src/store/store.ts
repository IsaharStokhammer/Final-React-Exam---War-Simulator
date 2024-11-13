import { configureStore } from "@reduxjs/toolkit";
import candidateReducer from './features/CandidateSlice'
import userReducer from "./features/UserSlice"
export const store = configureStore({
    reducer:{
        candidates:candidateReducer,
        user:userReducer
    }
})  

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch