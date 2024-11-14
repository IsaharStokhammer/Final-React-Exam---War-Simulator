import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResource, ILaunchedRocket, IUser } from "../../types/index";
import { RootState, store } from "../store";

interface RocketsState {
  organization: string;
  location: string;
  ammo: IResource[];
  launchedRockets: ILaunchedRocket[];
}


const rocketsSlice = createSlice({
  name: "rockets",
  initialState: {
    orientation: "xxxxxx",
    location: "North",
    ammo: [],
    launchedRockets: [],
  },
  reducers: {
    updateLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    launchRocket(state, action: PayloadAction<{ name: string }>) {},
  },
});

export const { updateLocation, launchRocket } = rocketsSlice.actions;
export default rocketsSlice.reducer;
