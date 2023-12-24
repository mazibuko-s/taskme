import React, { useEffect, useState } from "react";
import useGetAllTasks from "~/hooks/useGetAllTasks";
import Task from "~/models/task.model";

const AssignedTasks: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const { getAllTasks, loading, error } = useGetAllTasks();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Extract userId from the token
        const userId = localStorage.getItem("userId") || "";
        // Fetch tasks where the user is the assignee
        const assignedTasks = await getAllTasks(undefined, userId);
        setTasks(assignedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    // TODO: Add custom loader {a pen paper animation}
    return <div className="loader mt-1" />;
  }

  if (error) {
    return <div className="text-red-700">Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-center text-4xl underline">Assigned Tasks</h2>
      <ul>
        {tasks.map((task: Task) => (
          <li key={task.id} className="mb-4 flex flex-col rounded border p-4">
            <p>Title: {task.title}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Assigned by: {task.ownerId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignedTasks;
