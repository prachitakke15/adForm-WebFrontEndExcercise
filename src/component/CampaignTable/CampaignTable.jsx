import React from "react";
import styles from "./CampaignTable.module.scss";
import { useFilteredCampaigns } from "../../hooks/useFilteredCampaigns";

function CampaignTable() {
  const campaigns = useFilteredCampaigns();

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>User</th>
          <th>Start date</th>
          <th>End date</th>
          <th>Status</th>
          <th className={styles.thRight}>Budget (USD)</th>
        </tr>
      </thead>

      <tbody>
        {campaigns.map((c) => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.user || "Unknown User"}</td>
            <td>{c.startDate}</td>
            <td>{c.endDate}</td>
            <td>
              <span className={c.isActive ? styles.active : styles.inactive}>
                {c.isActive ? "Active" : "Inactive"}
              </span>
            </td>
            <td className={styles.tdRight}>${c.budget}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CampaignTable;
