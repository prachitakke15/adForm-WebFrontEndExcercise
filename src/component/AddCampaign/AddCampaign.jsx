import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCampaign } from "../../features/campaignSlice";
import styles from "./AddCampaign.module.scss";

function AddCampaign({ onClose }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !start || !end || !budget) {
      setError("Please fill all fields");
      return;
    }

    if (new Date(end) < new Date(start)) {
      setError("End date cannot be before start date");
      return;
    }

    dispatch(
      addCampaign({
        id: Date.now(),
        name,
        startDate: start,
        endDate: end,
        budget: Number(budget),
        userId: Math.floor(Math.random() * 100000),
      })
    );

    setName("");
    setStart("");
    setEnd("");
    setBudget("");
    setError("");

    if (onClose) onClose();
  }

  return (
    <div className={styles.wrapper}>
      <button className={styles.closeBtn} onClick={onClose}>
        ×
      </button>

      <form className={styles.form} onSubmit={handleSubmit}>

        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="start">Start date</label>
          <input
            id="start"
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="end">End date</label>
          <input
            id="end"
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="budget">Budget ($)</label>
          <input
            id="budget"
            type="number"
            value={budget}
            min="0"
            inputMode="numeric"
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>

        <button className={styles.button} type="submit">
          Add Campaign
        </button>

        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
}

export default AddCampaign;
