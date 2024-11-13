import { CandidateInterface, Status } from "../../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../store";
import axios from "axios";
interface UserStateType {
    candidates:CandidateInterface[] | [],
    status:Status,
    error: string | null;

}
const initialState:UserStateType={
    candidates:[],
    status :"idle",
    error: null
}
const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL)
export const fetchCandidates = createAsyncThunk('candidates/fetchCandidates',async (): Promise<CandidateInterface[]|undefined> => {
  
    const response = await axios.get(`${BASE_URL}/api/candidates`);
    return response.data

})

export const CandidateSlice = createSlice({
name: "candidate",
initialState,
reducers: {},
extraReducers(builder) {
  builder
    .addCase(fetchCandidates.pending, (state) => {
      state.status = "pending";
      state.error = null
  })
  .addCase(fetchCandidates.fulfilled, (state, action) => {
      if (action.payload) state.candidates = action.payload;
      state.status = "fulfilled";
    })
    .addCase(fetchCandidates.rejected, (state) => {
      state.error = "Canno't fetch students";
      state.status = "rejected";
    })
},
});

export default CandidateSlice.reducer
