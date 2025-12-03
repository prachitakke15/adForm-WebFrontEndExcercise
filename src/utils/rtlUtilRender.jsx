import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import campaignSlice from "../features/campaignSlice";

export function renderWithStore(ui, { preloadedState } = {}) {
  const store = configureStore({
    reducer: { campaigns: campaignSlice },
    preloadedState,
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
