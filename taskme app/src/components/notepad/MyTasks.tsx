import React, { useEffect, useState } from "react";
import useGetTask from "~/hooks/useGetTask";
import Task from "~/models/task.model";
import { jwtDecode } from "jwt-decode";

const MyTasks: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const { getTask, loading, error } = useGetTask();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Extract userId from the token
        const token = localStorage.getItem("token");
        const decodedToken: any = jwtDecode(token || "");

        // Fetch tasks assigned to the user (using ownerId)
        const userTasks = await getTask("", "", decodedToken.userId);
        setTasks(userTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [getTask]);

  if (loading) {
    // TODO: Add custom loader {a pen paper animation}
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map((task: Task) => (
          <li key={task.id}>
            <p>Title: {task.title}</p>
            <p>Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTasks;
