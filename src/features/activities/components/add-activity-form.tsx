import React, { useState } from "react";
import { useActivities } from "../hooks/use-activities";
import { generateId } from "../utils/activity-helpers";
import type { Frequency } from "../../../types";
import type { Activity } from "../types";

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
      <button onClick={() => setShowForm(true)}>+ Add New Activity</button>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Activity Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Morning meditation"
          required
        />
      </div>

      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of the activity"
        />
      </div>

      <div>
        <label>Frequency</label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as Frequency)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <div>
        <button type="submit">Add Activity</button>
        <button type="button" onClick={() => setShowForm(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
};
