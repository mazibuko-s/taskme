import React from "react";
import Notepad from "~/components/notepad/Notepad";

const Tasks: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#003a00] to-[#15162c]">
      <Notepad />
    </div>
  );
};
export default Tasks;
