import './App.css';
import {fetchTasks, fetchTask, postTask, deleteTaskById, toggleReminderByTask} from "./api/api.jsx";
import {useEffect, useState} from "react";
import RootLayout from "./components/RouteLayout.jsx";
import TodoApp from "./components/TodoApp.jsx"
import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router';
import About from "./components/About.jsx";


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

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
                <Route index element={<TodoApp
                    error={error}
                    tasks={tasks}
                    showAddTask={showAddTask}
                    setShowAddTask={setShowAddTask}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    toggleReminder={toggleReminder}
                />} />
                <Route path="/about" element={<About />} />
            </Route>
        )
    );

    return (
        <RouterProvider router={router} />
    );
}

export default App;
