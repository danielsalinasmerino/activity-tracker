import React, { useState } from "react";
import { useActivities } from "../hooks/use-activities";
import { generateId } from "../utils/activity-helpers";
import type { Frequency } from "../../../types";
import type { Activity } from "../types";
import styles from "./add-activity-form.module.css";

export const AddActivityForm: React.FC = () => {
  const { dispatch } = useActivities();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("daily");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newActivity: Activity = {
      id: generateId(),
      name: name.trim(),
      description: description.trim(),
      targetFrequency: frequency,
      createdAt: new Date(),
    };

    dispatch({ type: "ADD_ACTIVITY", payload: newActivity });
    setName("");
    setDescription("");
    setFrequency("daily");
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <div className={styles.container}>
        <button onClick={() => setShowForm(true)} className={styles.addButton}>
          + Add New Activity
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Activity Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            placeholder="e.g., Morning meditation"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
            placeholder="Brief description of the activity"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Frequency</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as Frequency)}
            className={styles.select}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            Add Activity
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
