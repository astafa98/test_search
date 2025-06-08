import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface ServiceState {
  token: string | null;
}

const initialState: ServiceState = {
  token: null,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = serviceSlice.actions;

export const selectToken = (state: RootState) => state.service.token;

export default serviceSlice.reducer;
