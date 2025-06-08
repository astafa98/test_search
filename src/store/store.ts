import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

import serviceReducer from "./serviceSlice";
import { queryApi } from "../api/queryApi";

const rootReducer = combineReducers({
  service: serviceReducer,
  [queryApi.reducerPath]: queryApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(queryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
