import React from "react";
import FilterBar from "./component/filterBar/FilterBar";
import styles from "./App.module.scss";
import CampaignTable from "./component/CampaignTable/CampaignTable";
import { useFetchCampaigns } from "./hooks/useFetchCampaigns";
function App() {
  const { loading, error } = useFetchCampaigns("https://jsonplaceholder.typicode.com/users");

  if (loading) return <div>Loading campaigns...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Campaign Manager</h1>
      <FilterBar />
      <CampaignTable />
    </div>
  );
}

export default App;
