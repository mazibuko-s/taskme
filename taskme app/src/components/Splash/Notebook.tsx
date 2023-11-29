import React, { useState } from "react";

const Notebook: React.FC = () => {
  const [Animationcount, setAnimationCount] = useState("");

  const handleClickAnimation = () => {
      setAnimationCount("play");
    };
    
  return (
    <div className="canvas">
      <div className="Notebook-loader">
        <div className="cover"></div>
        <div className="page one">
          <p>
            Task.ME
            <br />
            <span> beta!</span>
          </p>
        </div>
        <div className="page two"></div>
        <div className="page three"></div>
        <div className="page four"></div>
      </div>
      <div className="pencil">
        <div className="edge"></div>
      </div>
    </div>
  );
};
export default Notebook;