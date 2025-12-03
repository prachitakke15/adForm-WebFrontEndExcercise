import { screen, fireEvent } from "@testing-library/react";
import DataRangePicker from "./DataRangePicker";
import { renderWithStore } from "../../utils/rtlUtilRender";
import { setStartDate, setEndDate } from "../../features/campaignSlice";

describe("DataRangePicker Component", () => {
  test("renders start and end date inputs", () => {
    renderWithStore(<DataRangePicker />);

    expect(screen.getByLabelText("Start date")).toBeInTheDocument();
    expect(screen.getByLabelText("End date")).toBeInTheDocument();
  });

  test("dispatches setStartDate on start date change", () => {
    const { store } = renderWithStore(<DataRangePicker />);

    const startInput = screen.getByLabelText("Start date");

    fireEvent.change(startInput, { target: { value: "2024-05-10" } });
    expect(store.getState().campaigns.startDate).toBe("2024-05-10");
  });

  test("dispatches setEndDate on end date change", () => {
    const { store } = renderWithStore(<DataRangePicker />);

    const endInput = screen.getByLabelText("End date");

    fireEvent.change(endInput, { target: { value: "2024-05-15" } });

    expect(store.getState().campaigns.endDate).toBe("2024-05-15");
  });
});
