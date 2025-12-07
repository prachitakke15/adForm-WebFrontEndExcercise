import { configureStore } from "@reduxjs/toolkit";
import campaignReducer from "../features/campaignSlice";

export const store = configureStore({
  reducer: {
    campaigns: campaignReducer,
  },
});

export default store;
