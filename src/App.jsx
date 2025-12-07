// src/App.jsx
import React, { useEffect } from "react";
import FilterBar from "./component/filterBar/FilterBar";
import styles from "./App.module.scss";
import { useFetchCampaigns } from "./hooks/useFetchCampaigns";
import { store } from "./store/store";
import { addCampaign } from "./features/campaignSlice";

function App() {
  const { loading, error } = useFetchCampaigns(
    "https://jsonplaceholder.typicode.com/users"
  );

  useEffect(() => {
    window.AddCampaigns = function (campaignArray) {
      if (!Array.isArray(campaignArray)) {
        console.error("AddCampaigns expects an array of campaigns.");
        return;
      }

      campaignArray.forEach((c) => {
        store.dispatch(
          addCampaign({
            id: c.id ?? Date.now(),
            name: c.name ?? "Untitled Campaign",
            startDate: c.startDate ?? "",
            endDate: c.endDate ?? "",
            budget: Number(c.budget ?? 0),
            userId: c.userId ?? Math.floor(Math.random() * 100000),
          })
        );
      });

      console.log("Campaigns added successfully:", campaignArray);
    };
  }, []);

  if (loading) return <div>Loading campaigns...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Campaign Manager</h1>
      <FilterBar />
    </div>
  );
}

export default App;
