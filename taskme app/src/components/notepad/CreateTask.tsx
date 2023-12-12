import React, { useState } from "react";
import axios from "axios";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [assigneeId, setAssigneeId] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/task", {
        title,
        status,
        priority,
        dueDate,
        ownerId,
        assigneeId,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Status:
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </label>
      <label>
        Priority:
        <input
          type="text"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
      </label>
      <label>
        Due Date:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>
      <label>
        Owner ID:
        <input
          type="text"
          value={ownerId}
          onChange={(e) => setOwnerId(e.target.value)}
        />
      </label>
      <label>
        Assignee ID:
        <input
          type="text"
          value={assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
        />
      </label>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTask;
