import React from "react";
import styles from "./DataRangePicker.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setStartDate, setEndDate } from "../../features/campaignSlice";
function DataRangePicker() {
  const startDate = useSelector((state) => state.campaigns.startDate);
  const endDate = useSelector((state) => state.campaigns.endDate);
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <div className={styles.col}>
            <label htmlFor="start-date" className={styles.label}>Start date</label>
             <input
              type="date"
              id="start-date"
              value={startDate || ""}
              onChange={(e) => dispatch(setStartDate(e.target.value))}
            />
          </div>
          <div className={styles.col}>
            <label htmlFor="end-date" className={styles.label}>End date</label>
            <input
              type="date"
              id="end-date"
              value={endDate || ""}
              onChange={(e) => dispatch(setEndDate(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataRangePicker;
