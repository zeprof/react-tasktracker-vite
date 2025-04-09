
import './App.css';
import Header from './components/Header.jsx'
import Tasks from './components/Tasks.jsx'
import AddTask from './components/AddTask.jsx';
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

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:8080/todos')
        const data = await res.json()
        return data
    }

    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const newTask = {id, ...task}
        setTasks([...tasks, newTask])
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = (id) => {
        setTasks(
            tasks.map(
                (task) => task.id === id ?
                    {...task, reminder: !task.reminder} : task
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
