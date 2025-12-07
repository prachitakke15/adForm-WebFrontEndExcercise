import React, { useState } from "react";
import SearchBar from "../Searchbar/SearchBar";
import DateRangePicker from "../DataRangePicker/DataRangePicker";
import AddCampaign from "../AddCampaign/AddCampaign";
import styles from "./FilterBar.module.scss";
import { useDispatch } from "react-redux";
import { clearFilters } from "../../features/campaignSlice";
import CampaignTable from "../CampaignTable/CampaignTable";

const FilterBar = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.addBtn}
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? "Close Form" : "Add Campaign"}
      </button>

      {showForm && (
        <div className={styles.formContainer}>
          <AddCampaign onClose={() => setShowForm(false)} />
        </div>
      )}

      <div className={styles.filters}>
        <SearchBar />
        <DateRangePicker />

        <button
          type="button"
          className={styles.clearBtn}
          onClick={() => dispatch(clearFilters())}
        >
          Clear
        </button>
        <CampaignTable />
      </div>
    </div>
  );
};

export default FilterBar;
