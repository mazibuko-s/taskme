import React, { useState } from "react";
import OwnedTasks from "./OwnedTasks";
import AssignedTasks from "./AssignedTasks";
import TaskModal from "./TaskModal";

const Notepad: React.FC = () => {
  const [isOwnedTasks, setOwnedTasks] = useState<boolean>(false);
  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const username =
    typeof window !== "undefined" ? localStorage.getItem("username") : null;
  const handleToggle = () => {

    setOwnedTasks(!isOwnedTasks);
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
        <div className="flex justify-between">
          <button className="bg-gray-400 p-2" onClick={handleToggle}>
            {isOwnedTasks ? "assignedtasks" : "OwnedTasks"}
          </button>
          <h1 className="text-center text-4xl text-gray-300">
            Task.Me<span className="text-xs">beta</span>
          </h1>
          <div className="flex mr-10 mt-2">
            {username != null ? (
              <p className="text-lg font-bold text-gray-200 m-1">{username}</p>
            ) : (
              "Login"
            )}
            <img src={`https://api.multiavatar.com/${username}.svg`} />
          </div>
        </div>
      </div>
      <div className="paper">
        <button onClick={handleOpenTaskModal}>Create Task</button>
        {isOwnedTasks ? <OwnedTasks /> : <AssignedTasks />}
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
