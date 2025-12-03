// src/component/filterBar/FilterBar.jsx
import React from "react";
import SearchBar from "../Searchbar/SearchBar";
import DateRangePicker from "../DataRangePicker/DataRangePicker";
import AddCampaign from "../AddCampaign/AddCampaign";
import styles from "./FilterBar.module.scss";
import { useDispatch } from "react-redux";
import { clearFilters } from "../../features/campaignSlice";

const FilterBar = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <SearchBar />
        <DateRangePicker />

        <button
          type="button"
          className={styles.clearBtn}
          onClick={() => dispatch(clearFilters())}
        >
          Clear
        </button>
      </div>

      <AddCampaign />
    </div>
  );
};

export default FilterBar;
