import React, { useState, useContext, createContext, useReducer } from "react";
import { format, isToday } from "date-fns";
import styles from "./App.module.css";

// Types
interface Activity {
  id: string;
  name: string;
  description: string;
  targetFrequency: "daily" | "weekly";
  createdAt: Date;
}

interface ActivityCompletion {
  id: string;
  activityId: string;
  completedAt: Date;
  notes?: string;
}

interface AppState {
  activities: Activity[];
  completions: ActivityCompletion[];
}

type AppAction =
  | { type: "ADD_ACTIVITY"; payload: Activity }
  | { type: "DELETE_ACTIVITY"; payload: string }
  | { type: "COMPLETE_ACTIVITY"; payload: ActivityCompletion }
  | { type: "REMOVE_COMPLETION"; payload: string };

// Initial state
const initialState: AppState = {
  activities: [
    {
      id: "1",
      name: "Reading",
      description: "Read for at least 30 minutes",
      targetFrequency: "daily",
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Exercise",
      description: "Physical activity or workout",
      targetFrequency: "daily",
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Journaling",
      description: "Write in personal journal",
      targetFrequency: "daily",
      createdAt: new Date(),
    },
  ],
  completions: [],
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "ADD_ACTIVITY":
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };
    case "DELETE_ACTIVITY":
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.id !== action.payload
        ),
        completions: state.completions.filter(
          (completion) => completion.activityId !== action.payload
        ),
      };
    case "COMPLETE_ACTIVITY":
      return {
        ...state,
        completions: [...state.completions, action.payload],
      };
    case "REMOVE_COMPLETION":
      return {
        ...state,
        completions: state.completions.filter(
          (completion) => completion.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

// Components
const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
  const { state, dispatch } = useApp();
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");

  const todayCompletions = state.completions.filter(
    (completion) =>
      completion.activityId === activity.id && isToday(completion.completedAt)
  );

  const isCompletedToday = todayCompletions.length > 0;

  const handleComplete = () => {
    if (isCompletedToday) {
      // Remove completion
      const completion = todayCompletions[0];
      dispatch({ type: "REMOVE_COMPLETION", payload: completion.id });
    } else {
      // Add completion
      const newCompletion: ActivityCompletion = {
        id: Date.now().toString(),
        activityId: activity.id,
        completedAt: new Date(),
        notes: notes.trim() || undefined,
      };
      dispatch({ type: "COMPLETE_ACTIVITY", payload: newCompletion });
      setNotes("");
      setShowNotes(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      dispatch({ type: "DELETE_ACTIVITY", payload: activity.id });
    }
  };

  return (
    <div
      className={`${styles.activityCard} ${
        isCompletedToday ? styles.completed : ""
      }`}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardContent}>
          <h3 className={styles.activityName}>{activity.name}</h3>
          <p className={styles.activityDescription}>{activity.description}</p>
          <span className={styles.frequencyBadge}>
            {activity.targetFrequency}
          </span>
        </div>
        <div className={styles.cardActions}>
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={styles.actionButton}
            title="Add notes"
          >
            📝
          </button>
          <button
            onClick={handleDelete}
            className={`${styles.actionButton} ${styles.deleteButton}`}
            title="Delete activity"
          >
            🗑️
          </button>
        </div>
      </div>

      {showNotes && !isCompletedToday && (
        <div className={styles.notesSection}>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this activity..."
            className={styles.notesTextarea}
            rows={2}
          />
        </div>
      )}

      {isCompletedToday && todayCompletions[0].notes && (
        <div className={styles.completionNotes}>
          <strong>Notes:</strong> {todayCompletions[0].notes}
        </div>
      )}

      <button
        onClick={handleComplete}
        className={`${styles.completeButton} ${
          isCompletedToday ? styles.completedButton : ""
        }`}
      >
        {isCompletedToday ? "✓ Completed" : "Mark Complete"}
      </button>
    </div>
  );
};

const AddActivityForm: React.FC = () => {
  const { dispatch } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newActivity: Activity = {
      id: Date.now().toString(),
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
      <button onClick={() => setShowForm(true)} className={styles.addButton}>
        + Add New Activity
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.addForm}>
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
          onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
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
  );
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const todayCompletedCount = state.completions.filter((completion) =>
    isToday(completion.completedAt)
  ).length;

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className={styles.app}>
        <header className={styles.header}>
          <h1 className={styles.title}>Activity Tracker</h1>
          <p className={styles.subtitle}>
            {format(new Date(), "EEEE, MMMM do, yyyy")}
          </p>
          <div className={styles.stats}>
            {todayCompletedCount} activities completed today
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.activitiesGrid}>
            {state.activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
            <div className={styles.addActivityContainer}>
              <AddActivityForm />
            </div>
          </div>
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default App;
