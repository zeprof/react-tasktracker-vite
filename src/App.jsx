import './App.css';
import Header from './components/Header.jsx'
import Tasks from './components/Tasks.jsx'
import AddTask from './components/AddTask.jsx';
import {fetchTasks, fetchTask, postTask, deleteTaskById, toggleReminderByTask} from "./api/api.jsx";
import {useEffect, useState} from "react";


function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State to hold error messages
    const [tasks, setTasks] = useState()

    //const {showBoundary} = useErrorBoundary();

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        const getTasks = async () => {
            setLoading(true); // Start loading
            setError(null);   // Clear previous errors
            try {
                await sleep(1000)
                const data = await fetchTasks();
                setTasks(data);
            } catch (err) {
                console.error("Error caught in component:", err);
                // Set the error state with a user-friendly message
                setError(err.message || 'An unexpected error occurred.');
            } finally {
                setLoading(false); // Stop loading regardless of success or error
            }
        };
        getTasks();
    }, []); // Ajout de dependency array pour prevenir le 'useEffect' a chaquer 'render()'


    const addTask = async (task) => {
        setLoading(true); // Start loading
        setError(null);   // Clear previous errors
        try {
            const res = await postTask(task)
            const data = await res.json()
            setTasks([...tasks, data])
        } catch (err) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false); // Stop loading regardless of success or error
        }
    }

    const deleteTask = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deleteTaskById(id)
            setTasks(tasks.filter((task) => task.id !== id))
        } catch (err) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    }

    const toggleReminder = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const taskToToggle = await fetchTask(id)
            const updTask = {
                ...taskToToggle,
                reminder: !taskToToggle.reminder
            }

            await toggleReminderByTask(updTask)
            setTasks(
                tasks.map(
                    (task) => task.id === id ?
                        {...task, reminder: updTask.reminder} : task
                )
            )
        } catch (err) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    return (
        <>
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
    );
}

export default App;
