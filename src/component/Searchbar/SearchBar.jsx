import React from "react";
import styles from "./SearchBar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../../features/campaignSlice";

const SearchBar = () => {
  const searchValue = useSelector((state) => state.campaigns.searchValue);
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Search by name</label>
      <input
        type="text"
        value={searchValue}
        placeholder="Search campaigns"
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
    </div>
  );
};

export default SearchBar;
