import React, { useState } from "react";
import MyTasks from "./MyTasks";
import AssignedTasks from "./AssignedTasks";

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
          {isMyTasks ? "assignedtasks" : "mytasks"}
        </button>
      </div>
      <div className="paper">{isMyTasks ? <MyTasks /> : <AssignedTasks />}</div>
    </div>
  );
};

export default Notepad;
