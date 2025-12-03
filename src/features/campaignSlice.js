import { createSlice } from "@reduxjs/toolkit";

const campaignSlice = createSlice({
  name: "campaigns",
  initialState: {
    list: [],
    searchValue: "",
    startDate: "",
    endDate: "",
  },
  reducers: {
    setCampaigns(state, action) {
      state.list = action.payload;
    },
    setSearch(state, action) {
      state.searchValue = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
    clearFilters(state) {
      state.searchValue = "";
      state.startDate = "";
      state.endDate = "";
    },
    addCampaign(state, action) {
      state.list.push(action.payload);
    },
  },
});

export const {
  setCampaigns,
  setSearch,
  setStartDate,
  setEndDate,
  clearFilters,
  addCampaign,
} = campaignSlice.actions;

export default campaignSlice.reducer;
