import Header from "./Header.jsx";
import AddTask from "./AddTask.jsx";
import Tasks from "./Tasks.jsx";

function TodoApp({error, tasks, showAddTask, setShowAddTask, addTask, deleteTask, toggleReminder}) {
    return (<>
            {error && <div style={{color: 'red'}}>Error loading tasks: {error}</div>}
            <div className='container'>
                <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddTask)}
                        showAdd={showAddTask}/>
                {showAddTask && <AddTask onAdd={addTask}/>}
                {tasks != null && tasks.length > 0 ?
                    <Tasks tasks={tasks}
                           onDelete={deleteTask}
                           onToggle={toggleReminder}/>
                    : 'No tasks'}
            </div>
        </>
    )
}

export default TodoApp;