import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCampaigns } from "../features/campaignSlice";

export function useFetchCampaigns(url) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const res = await fetch(url);
        const users = await res.json();

        const campaigns = users.map((u) => {
          const start = new Date(2024, 0, u.id + 5);
          const end = new Date(start);
          end.setDate(start.getDate() + (u.id % 5) + 10);

          return {
            id: u.id,
            name: u.name,
            user: u.username,
            startDate: start.toISOString().split("T")[0],
            endDate: end.toISOString().split("T")[0],
            budget: u.id * 1000,
          };
        });

        dispatch(setCampaigns(campaigns));
      } catch (err) {
        setError("Failed to load campaigns");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [dispatch, url]);

  return { loading, error };
}
