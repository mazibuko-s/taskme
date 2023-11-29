import React from'react';
 
const Notepad: React.FC = () => 
{
return (<div className="notepad">
  <div className="top"></div>
  <div className="paper" contentEditable="true">
    Hello, this is a paper.<br/>
    Click to write your message.
  </div>
</div>);
}
export default Notepad;