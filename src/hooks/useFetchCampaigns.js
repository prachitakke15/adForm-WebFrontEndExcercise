import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCampaigns } from "../features/campaignSlice";

export function useFetchCampaigns(url) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers(url) {
      try {
        setLoading(true);

        const response = await fetch(url);
        const data = await response.json();

        console.log(data, "data");

        const campaigns = data.map((user, index) => {
          const start = new Date(2024, 0, user.id + 5); 
          const end = new Date(start);
          end.setDate(start.getDate() + 10 + (user.id % 5)); 

          return {
            id: user.id,
            name: user.name,
            user: user.username,
            startDate: start.toISOString().split("T")[0],
            endDate: end.toISOString().split("T")[0],
            active: index % 2 === 0,
            budget: (index + 1) * 1000,
          };
        });

        dispatch(setCampaigns(campaigns));
        setLoading(false);
      } catch (err) {
        setError("Failed to load campaigns");
        setLoading(false);
        console.log(err);
      }
    }

    fetchUsers(url);
  }, [dispatch, url]);

  return { loading, error };
}
