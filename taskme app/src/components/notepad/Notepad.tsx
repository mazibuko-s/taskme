import React, { useState } from "react";
import MyTasks from "./MyTasks";
import AssignedTasks from "./AssignedTasks";
import TaskModal from "./TaskModal"; // Import TaskModal component

const Notepad: React.FC = () => {
  const [isMyTasks, setMyTasks] = useState<boolean>(false);
  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setMyTasks(!isMyTasks);
  };

  const handleOpenTaskModal = () => {
    setTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setTaskModalOpen(false);
  };

  return (
    <div className="notepad">
      <div className="top">
        <h1 className="text-center text-4xl text-gray-300">
          Task.Me<span className="text-xs">beta</span>
        </h1>
        <button className="bg-gray-400 p-2" onClick={handleToggle}>
          {isMyTasks ? "assignedtasks" : "mytasks"}
        </button>
      </div>
      <div className="paper">
        <button onClick={handleOpenTaskModal}>Create Task</button>
        {isMyTasks ? <MyTasks /> : <AssignedTasks />}  
      </div>
      {isTaskModalOpen && (
        <TaskModal
          isOpen={isTaskModalOpen}
          onRequestClose={handleCloseTaskModal}
        />
      )}
    </div>
  );
};

export default Notepad;
