import Task from "./Task.jsx";

const Tasks = ({tasks}) => {
    return (
        // tasks.push()  ne fonctionne pas puisque tasks est immuable
        // il faut plutot faire la ligne suivante
        // setTasks([...tasks, {}])  utilise le spread operator ...
        <>
            {tasks.map((task) => (
                <Task key={task.id} task={task}/>
            ))}
        </>
    )
}

export default Tasks
