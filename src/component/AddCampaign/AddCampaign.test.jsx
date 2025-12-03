
import { screen, fireEvent } from "@testing-library/react";
import AddCampaign from "./AddCampaign";
import { renderWithStore } from "../../utils/rtlUtilRender";

describe("AddCampaign Component", () => {
  test("shows error when fields are empty", () => {
    const { store } = renderWithStore(<AddCampaign />);

    fireEvent.click(screen.getByText("Add Campaign"));

    expect(screen.getByText("Please fill all fields")).toBeInTheDocument();

    // no actions dispatched
    expect(store.getState().campaigns.list.length).toBe(0);
  });

  test("shows error when end date is before start date", () => {
    renderWithStore(<AddCampaign />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Test Campaign" },
    });
    fireEvent.change(screen.getByLabelText("Start date"), {
      target: { value: "2024-01-10" },
    });
    fireEvent.change(screen.getByLabelText("End date"), {
      target: { value: "2024-01-05" },
    });
    fireEvent.change(screen.getByLabelText("Budget ($)"), {
      target: { value: "5000" },
    });
    fireEvent.change(screen.getByLabelText("User ID"), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByText("Add Campaign"));

    expect(
      screen.getByText("End date cannot be before start date")
    ).toBeInTheDocument();
  });

  test("dispatches addCampaign when valid form submitted", () => {
    const { store } = renderWithStore(<AddCampaign />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "New Campaign" },
    });
    fireEvent.change(screen.getByLabelText("Start date"), {
      target: { value: "2024-01-01" },
    });
    fireEvent.change(screen.getByLabelText("End date"), {
      target: { value: "2024-01-10" },
    });
    fireEvent.change(screen.getByLabelText("Budget ($)"), {
      target: { value: "7000" },
    });
    fireEvent.change(screen.getByLabelText("User ID"), {
      target: { value: "5" },
    });

    fireEvent.click(screen.getByText("Add Campaign"));

    const actions = store.getState().campaigns.list;
    expect(actions.length).toBe(1);
    expect(actions[0]).toMatchObject({
      name: "New Campaign",
      startDate: "2024-01-01",
      endDate: "2024-01-10",
      budget: 7000,
      userId: 5,
    });
  });
});
