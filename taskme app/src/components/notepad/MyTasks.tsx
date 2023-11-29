import React from'react';
 
interface MyTasksProps{
prop: string
}
 
const MyTasks: React.FC<MyTasksProps> = ({prop}) => 
{
return (<div>MyTasks</div>);
}
export default MyTasks;