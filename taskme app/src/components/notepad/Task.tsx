import React from "react";

interface TaskProps {
  title: string;
  status: string;
  priority: string;
  dueDate: Date;
  ownerId: string;
  assigneeId: string;
}

const Task: React.FC<TaskProps> = ({
  title,
  status,
  priority,
  dueDate,
  ownerId,
  assigneeId,
}) => {
  return (
    <div>
      <h3>Title: {title}</h3>
      <p>Status: {status}</p>
      <p>Priority: {priority}</p>
      <p>Due Date: {dueDate.toDateString()}</p>
      <p>Owner ID: {ownerId}</p>
      <p>Assignee ID: {assigneeId}</p>
    </div>
  );
};

export default Task;
