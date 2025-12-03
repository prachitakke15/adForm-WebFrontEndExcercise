import React from 'react'
import styles from './CampaignTable.module.scss'
import {  useSelector } from 'react-redux';
import { useFilteredCampaigns } from "../../hooks/useFilteredCampaigns";

function CampaignTable() {
  const list = useSelector((state) => state.campaigns.list);
    const campaigns = useFilteredCampaigns();
  console.log(list,campaigns,'list in campaign table');
  
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className={styles.thLeft}>Name</th>
          <th className={styles.thLeft}>User</th>
          <th className={styles.thLeft}>Start date</th>
          <th className={styles.thLeft}>End date</th>
          <th className={styles.thLeft}>Active</th>
          <th className={styles.thRight}>Budget (USD)</th>
        </tr>
      </thead>
   <tbody>
        {campaigns.map((c) => (
          <tr key={c.id}>
            <td className={styles.td}>{c.name}</td>
            <td className={styles.td}>{c.user || "Unknown user"}</td>
            <td className={styles.td}>{c.startDate}</td>
            <td className={styles.td}>{c.endDate}</td>
            <td className={styles.td}>{c.isActive ? "Yes" : "No"}</td>
            <td className={styles.tdRight}>{c.budget}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CampaignTable
