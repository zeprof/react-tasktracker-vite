
import './App.css';
import Header from './components/Header.jsx'
import Tasks from './components/Tasks.jsx'
import AddTask from './components/AddTask.jsx';
import {useState} from "react";


function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([
            {
                id: 1,
                text: 'Preparer mon cours',
                day: '19 Avril @ 14:25',
                reminder: true,
            },
            {
                id: 2,
                text: 'Commencer mon TP',
                day: '20 Septembre @ 09:00',
                reminder: false,
            },
            {
                id: 3,
                text: 'Faire des tests',
                day: '23 Septembre @ 10:00',
                reminder: false,
            },
        ]
    )

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
            {tasks.length > 0 ?
                <Tasks tasks={tasks}
                       onDelete={deleteTask}
                       onToggle={toggleReminder}/>
                : 'No tasks'}
        </div>
    );
}

export default App;
