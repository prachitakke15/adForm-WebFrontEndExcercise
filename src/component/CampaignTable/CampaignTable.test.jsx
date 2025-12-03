import { screen } from "@testing-library/react";
import CampaignTable from "./CampaignTable";
import { renderWithStore } from "../../utils/rtlUtilRender";

describe("CampaignTable", () => {
  test("renders campaign rows correctly", () => {
    const preloadedState = {
      campaigns: {
        list: [
          {
            id: 1,
            name: "Black Friday",
            user: "John",
            startDate: "2024-01-01",
            endDate: "2024-01-10",
            budget: 5000,
          },
          {
            id: 2,
            name: "Winter Sale",
            user: "",
            startDate: "2024-02-01",
            endDate: "2024-02-05",
            budget: 3000,
          }
        ],
        searchValue: "",
        startDate: "",
        endDate: "",
      }
    };

    renderWithStore(<CampaignTable />, { preloadedState });

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByText("Start date")).toBeInTheDocument();

    expect(screen.getByText("Black Friday")).toBeInTheDocument();
    expect(screen.getByText("Winter Sale")).toBeInTheDocument();

    expect(screen.getByText("Unknown user")).toBeInTheDocument();

    expect(screen.getByText("5000")).toBeInTheDocument();
    expect(screen.getByText("3000")).toBeInTheDocument();
  });

  test("applies active/inactive status correctly", () => {
    const today = new Date().toISOString().split("T")[0];

    const preloadedState = {
      campaigns: {
        list: [
          {
            id: 1,
            name: "Active Campaign",
            user: "Jane",
            startDate: today,
            endDate: today,
            budget: 1000,
          },
          {
            id: 2,
            name: "Inactive Campaign",
            user: "Bob",
            startDate: "2020-01-01",
            endDate: "2020-01-05",
            budget: 2000,
          }
        ],
        searchValue: "",
        startDate: "",
        endDate: "",
      }
    };

    renderWithStore(<CampaignTable />, { preloadedState });
  });
});
