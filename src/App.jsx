
import './App.css';
import Header from './components/Header.jsx'
import Tasks from './components/Tasks.jsx'
import AddTask from './components/AddTask.jsx';
import {fetchTasks, fetchTask, postTask, deleteTaskById, toggleReminderByTask} from "./api/api.jsx";
import {useEffect, useState} from "react";


function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState()

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])
    // Ajout de dependency array pour prevenir le 'useEffect' a chaquer 'render()'

    const addTask = async (task) => {
        const res = await postTask(task)
        const data = await res.json()
        setTasks([...tasks, data])
    }

    const deleteTask = async (id) => {
        await deleteTaskById(id)
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updTask = {...taskToToggle,
            reminder: !taskToToggle.reminder}

        await toggleReminderByTask(updTask)

        setTasks(
            tasks.map(
                (task) => task.id === id ?
                    {...task, reminder: updTask.reminder} : task
            )
        )
    }

    return (
        <div className='container'>
            <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddTask)}
                    showAdd={showAddTask}/>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks != null && tasks.length > 0 ?
                <Tasks tasks={tasks}
                       onDelete={deleteTask}
                       onToggle={toggleReminder}/>
                : 'No tasks'}
        </div>
    );
}

export default App;
