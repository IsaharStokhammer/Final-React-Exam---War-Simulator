import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/UserSlice";
import rocketsSlice from "./features/rocketsSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    rockets: rocketsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
