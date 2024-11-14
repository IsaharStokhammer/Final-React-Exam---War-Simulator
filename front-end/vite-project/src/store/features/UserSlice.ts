import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, Status, User } from "../../types";
import axios from "axios";

interface UserStateType {
  organization: string;
  user: IUser | null;
  status: Status;
  error: string | null;
  token: string | null;
}

const initialState: UserStateType = {
  organization: "",
  user: null,
  status: "idle",
  error: null,
  token: localStorage.getItem("token") || null,
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData: {
    userName: string;
    password: string;
    organization: string;
  }) => {
    const response = await axios.post(`${BASE_URL}/api/register`, userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: User) => {
    const response = await axios.post(`${BASE_URL}/api/login`, user);
    localStorage.setItem("token", response.data.token);
    return response.data.user;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setOrganization(state, action: PayloadAction<string>) {
      state.organization = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.user = null;
        state.status = "pending";
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<any>): void => {
          if (action.payload) {
            state.user = action.payload;
            state.organization = action.payload.organization; // קביעת הארגון לפי היוזר
            state.error = null;
            state.status = "fulfilled";
          }
        }
      )
      .addCase(loginUser.rejected, (state) => {
        state.error = "error";
        state.status = "rejected";
        state.user = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.user = null;
        state.status = "pending";
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<any>): void => {
          if (action.payload) {
            state.user = action.payload;
            state.organization = action.payload.organization; // קביעת הארגון לפי היוזר
            state.error = null;
            state.status = "fulfilled";
          }
        }
      )
      .addCase(registerUser.rejected, (state) => {
        state.error = "error";
        state.status = "rejected";
        state.user = null;
      });
  },
});

export const { setOrganization } = userSlice.actions;

export default userSlice.reducer;
