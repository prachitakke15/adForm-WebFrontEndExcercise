import { renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store/store";
import { useFetchCampaigns } from "./useFetchCampaigns";
import { setCampaigns } from "../features/campaignSlice";

global.fetch = vi.fn();

function wrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

describe("useFetchCampaigns", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("fetches campaigns successfully and dispatches setCampaigns", async () => {
    const mockData = [
      { id: 1, name: "John", username: "johnny" },
      { id: 2, name: "Alice", username: "ali" }
    ];

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    });

    const spy = vi.spyOn(store, "dispatch");

    const { result } = renderHook(
      () => useFetchCampaigns("https://api.com/users"),
      { wrapper }
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() =>
      expect(spy).toHaveBeenCalledWith(expect.any(Object))
    );

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      type: setCampaigns.type,
    }));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test("sets error when fetch fails", async () => {
    fetch.mockRejectedValueOnce(new Error("API Error"));

    const { result } = renderHook(
      () => useFetchCampaigns("https://api.com/users"),
      { wrapper }
    );

    await waitFor(() =>
      expect(result.current.error).toBe("Failed to load campaigns")
    );

    expect(result.current.loading).toBe(false);
  });
});
