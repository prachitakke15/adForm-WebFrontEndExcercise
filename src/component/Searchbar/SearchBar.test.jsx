import { screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { renderWithStore } from "../../utils/rtlUtilRender";

describe("SearchBar component", () => {
  test("renders input with placeholder and shows initial value from store", () => {
    const preloadedState = {
      campaigns: {
        list: [],
        searchValue: "initial",
        startDate: "",
        endDate: "",
      },
    };

    renderWithStore(<SearchBar />, { preloadedState });

    const input = screen.getByPlaceholderText("Search campaigns");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("initial");
  });

  test("updates redux searchValue when user types", () => {
    const { store } = renderWithStore(<SearchBar />);

    const input = screen.getByPlaceholderText("Search campaigns");
    fireEvent.change(input, { target: { value: "summer sale" } });

    expect(store.getState().campaigns.searchValue).toBe("summer sale");
  });
});
