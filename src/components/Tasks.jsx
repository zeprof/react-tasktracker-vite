import Task from "./Task.jsx";

const Tasks = ({tasks, onDelete, onToggle, onEdit}) => {
    return (
        // tasks.push()  ne fonctionne pas puisque tasks est immuable
        // il faut plutot faire la ligne suivante
        // setTasks([...tasks, {}])  utilise le spread operator ...
        <>
            {tasks.map((task) => (
                <Task key={task.id}
                      task={task}
                      onDelete={onDelete}
                      onToggle={onToggle}
                      onEdit={onEdit}/>
            ))}
        </>
    )
}

export default Tasks
