import { screen, fireEvent } from "@testing-library/react";
import FilterBar from "./FilterBar";
import { renderWithStore } from "../../utils/rtlUtilRender";

describe("FilterBar Component", () => {
  test("renders SearchBar, DateRangePicker, Clear button, and Add button", () => {
    renderWithStore(<FilterBar />);

    expect(screen.getByText("Search by name")).toBeInTheDocument();

    expect(screen.getByText("Clear")).toBeInTheDocument();

    expect(screen.getByText("Add Campaign")).toBeInTheDocument();

    expect(screen.queryByLabelText("Name")).not.toBeInTheDocument();
  });

  test("shows AddCampaign form after clicking Add Campaign", () => {
    renderWithStore(<FilterBar />);

    fireEvent.click(screen.getByText("Add Campaign"));

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Budget ($)")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close Form"));

    expect(screen.queryByLabelText("Name")).not.toBeInTheDocument();
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
