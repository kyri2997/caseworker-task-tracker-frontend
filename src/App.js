// src/App.js
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");
  const [createdTask, setCreatedTask] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple front-end validation
    if (!title || !status || !dueDate) {
      setMessage("Title, status, and due date are required.");
      return;
    }

    const taskData = { title, description, status, dueDate };

    try {
      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to create task");
        setCreatedTask(null);
      } else {
        setMessage("Task created successfully!");
        setCreatedTask(data);
        // Reset form
        setTitle("");
        setDescription("");
        setStatus("open");
        setDueDate("");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Caseworker Task Tracker</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Title*</label>
        <input
          style={styles.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label style={styles.label}>Description</label>
        <textarea
          style={styles.input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label style={styles.label}>Status*</label>
        <select
          style={styles.input}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <label style={styles.label}>Due Date*</label>
        <input
          style={styles.input}
          type="datetime-local"
          value={dueDate}
          onChange={(e) => 
            setDueDate(e.target.value)}
        />

        <button type="submit" style={styles.button}>
          Create Task
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}

      {createdTask && (
        <div style={styles.taskCard}>
          <h2>{createdTask.title}</h2>
          <p>{createdTask.description}</p>
          <p>
            <strong>Status:</strong> {createdTask.status}
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {new Date(createdTask.dueDate).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

// Simple inline styles for a clean HMCTS-style UI
const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: { textAlign: "center", color: "#004ea8" },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRadius: "8px",
  },
  label: { fontWeight: "bold" },
  input: { padding: "8px", borderRadius: "4px", border: "1px solid #ccc" },
  button: {
    padding: "10px",
    backgroundColor: "#004ea8",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  message: { marginTop: "20px", fontWeight: "bold", color: "green" },
  taskCard: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#fff",
  },
};

export default App;
