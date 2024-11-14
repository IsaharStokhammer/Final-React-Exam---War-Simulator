import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResource, ILaunchedRocket, IUser } from "../../types/index";
import { RootState, store } from "../store";

interface RocketsState {
  organization: string;
  location: string;
  ammo: IResource[];
  launchedRockets: ILaunchedRocket[];
}

// const getInitialOrganization = (state: RootState) => state.user.organization || "xxxxxxxxx";

const initialState: RocketsState = {
    organization: "",
    location: "North",
    ammo: [],
    launchedRockets: [],
  };
// const initialState: RocketsState = {
//   organization: (state: RootState) => state.user.organization || "xxxxxxxxx",
//   location: "North",
//   ammo: [],
//   launchedRockets: [],
// };

const rocketsSlice = createSlice({
  name: "rockets",
  initialState,
//   initialState: {
//     ...initialState,
//     organization: getInitialOrganization(store.getState()), // בהנחה שיש לך אובייקט store
//   },
  reducers: {
    updateLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    launchRocket(
      state,
      action: PayloadAction<{ name: string; timeToHit: string }>
    ) {
      const rocket = state.ammo.find((r) => r.name === action.payload.name);
      if (rocket && rocket.amount > 0) {
        rocket.amount -= 1;
        state.launchedRockets.push({
          name: action.payload.name,
          timeToHit_in_sec: parseInt(action.payload.timeToHit, 10),
          status: "Launched",
        });
      }
    },
  },
});

export const { updateLocation, launchRocket } = rocketsSlice.actions;
export default rocketsSlice.reducer;
