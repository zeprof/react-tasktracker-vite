import Header from "./Header.jsx";
import AddTask from "./AddTask.jsx";
import Tasks from "./Tasks.jsx";
import {useState} from "react";

function TodoApp({error, tasks, addTask, deleteTask, toggleReminder, onEdit}) {
    const [showAddTask, setShowAddTask] = useState(false)

    return (<>
            {error && <div style={{color: 'red'}}>Error: {error}</div>}
            <div className='container'>
                <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddTask)}
                        showAdd={showAddTask}/>
                {showAddTask && <AddTask onAdd={addTask}/>}
                {tasks != null && tasks.length > 0 ?
                    <Tasks tasks={tasks}
                           onDelete={deleteTask}
                           onToggle={toggleReminder}
                           onEdit={onEdit}/>
                    : 'No tasks'}
            </div>
        </>
    )
}

export default TodoApp;