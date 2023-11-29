import React, { useState } from "react";

const Notepad: React.FC = () => {
  const [isMyTasks, setMyTasks] = useState<boolean>(false);

  const handleToggle = () => {
    setMyTasks(!isMyTasks);
  };

  return (
    <div className="notepad">
      <div className="top">
        <p>TaskMe</p>
        <button onClick={handleToggle}>
          {isMyTasks ? "mytasks" : "assignedtasks"}
        </button>
      </div>
      <div className="paper">{isMyTasks ? "mytasks" : "assignedtasks"}</div>
    </div>
  );
};

export default Notepad;
