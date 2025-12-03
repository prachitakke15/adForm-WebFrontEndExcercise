import { renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import campaignReducer, { setSearch, setStartDate, setEndDate } from "../features/campaignSlice";
import { useFilteredCampaigns } from "./useFilteredCampaigns";

function createTestStore(preloadedState) {
  return configureStore({
    reducer: { campaigns: campaignReducer },
    preloadedState,
  });
}

function wrapper(store) {
  return ({ children }) => <Provider store={store}>{children}</Provider>;
}

describe("useFilteredCampaigns", () => {
  const mockCampaigns = [
    {
      id: 1,
      name: "Summer Sale",
      startDate: "2024-05-10",
      endDate: "2024-05-20",
      budget: 1000,
    },
    {
      id: 2,
      name: "Winter Offer",
      startDate: "2024-06-01",
      endDate: "2024-06-10",
      budget: 2000,
    },
    {
      id: 3,
      name: "Black Friday",
      startDate: "2024-11-01",
      endDate: "2024-11-25",
      budget: 5000,
    },
  ];

  function setup(preloaded = {}) {
    const store = createTestStore({
      campaigns: {
        list: mockCampaigns,
        searchValue: "",
        startDate: "",
        endDate: "",
        ...preloaded,
      },
    });

    const hook = renderHook(() => useFilteredCampaigns(), {
      wrapper: wrapper(store),
    });

    return { store, result: hook.result };
  }

  test("returns all campaigns with no filters", () => {
    const { result } = setup();
    expect(result.current.length).toBe(3);
  });

  test("filters by search value", async () => {
    const { store, result } = setup();

    store.dispatch(setSearch("winter"));

    await waitFor(() => {
      expect(result.current.length).toBe(1);
      expect(result.current[0].name).toBe("Winter Offer");
    });
  });

  test("filters campaigns inside date range", async () => {
    const { store, result } = setup();

    store.dispatch(setStartDate("2024-05-01"));
    store.dispatch(setEndDate("2024-05-30"));

    await waitFor(() => {
      const names = result.current.map((c) => c.name);
      expect(names).toContain("Summer Sale");
      expect(names).not.toContain("Winter Offer");
    });
  });

  test("includes campaigns where endDate is inside the range", async () => {
    const { store, result } = setup();

    store.dispatch(setStartDate("2024-06-05"));
    store.dispatch(setEndDate("2024-06-20"));

    await waitFor(() => {
      const names = result.current.map((c) => c.name);
      expect(names).toContain("Winter Offer");
    });
  });

  test("includes campaigns overlapping the entire selected date range", async () => {
    const { store, result } = setup();

    store.dispatch(setStartDate("2024-11-05"));
    store.dispatch(setEndDate("2024-11-10"));

    await waitFor(() => {
      const names = result.current.map((c) => c.name);
      expect(names).toContain("Black Friday");
    });
  });

  test("adds isActive boolean (true/false) for campaigns", async () => {
    const today = new Date().toISOString().split("T")[0];

    const { store, result } = setup();

    store.dispatch(setStartDate(today));
    store.dispatch(setEndDate(today));

    await waitFor(() => {
      result.current.forEach((c) => {
        expect(typeof c.isActive).toBe("boolean");
      });
    });
  });
});
