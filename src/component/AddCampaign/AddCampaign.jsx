import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCampaign } from "../../features/campaignSlice";
import styles from "./AddCampaign.module.scss";

function AddCampaign() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [budget, setBudget] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !start || !end || !budget || !userId) {
      setError("Please fill all fields");
      return;
    }

    if (new Date(end) < new Date(start)) {
      setError("End date cannot be before start date");
      return;
    }

    setError("");

    dispatch(
      addCampaign({
        id: Date.now(),
        name,
        startDate: start,
        endDate: end,
        budget: Number(budget),
        userId: Number(userId),
      })
    );

    setName("");
    setStart("");
    setEnd("");
    setBudget("");
    setUserId("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className={styles.field}>
        <label htmlFor="start">Start date</label>
        <input
          type="date"
          id="start"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="end">End date</label>
        <input
          type="date"
          id="end"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="budget">Budget ($)</label>
        <input
          type="number"
          id="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="userId">User ID</label>
        <input
          type="number"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      <button type="submit" className={styles.button}>Add Campaign</button>

      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
}

export default AddCampaign;
