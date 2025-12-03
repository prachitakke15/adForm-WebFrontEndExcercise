import { screen, fireEvent } from "@testing-library/react";
import FilterBar from "./FilterBar";
import { renderWithStore } from "../../utils/rtlUtilRender";

describe("FilterBar Component", () => {
  test("renders SearchBar, DateRangePicker, Clear button, and AddCampaign", () => {
    renderWithStore(<FilterBar />);

    expect(screen.getByText("Search by name")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("User ID")).toBeInTheDocument();
  });

  test("dispatches clearFilters when Clear button is clicked", () => {
    const { store } = renderWithStore(<FilterBar />);
    const clearBtn = screen.getByText("Clear");
    fireEvent.click(clearBtn);
    const state = store.getState().campaigns;

    expect(state.searchValue).toBe("");
    expect(state.startDate).toBe("");
    expect(state.endDate).toBe("");
  });
});
