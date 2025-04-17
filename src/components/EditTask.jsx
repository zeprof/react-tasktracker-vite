import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";

const EditTask = ({tasks, editTask}) => {
    const [taskToEdit, setTaskToEdit] = useState()
    const [description, setDescription] = useState('');
    const [zedate, setZedate] = useState('')
    const [reminder, setReminder] = useState(false);

    const params = useParams();
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const initTask = async () => {
            const taskId = params.taskId;
            // Find the task only if tasks array is available
            if (tasks && tasks.length > 0) {
                // Ensure taskId is treated as a number if task.id is a number
                const aTask = tasks.find(task => task.id === parseInt(taskId));
                if (aTask) {
                    setTaskToEdit(aTask);
                    // --- Pre-fill form state when task is found ---
                    setDescription(aTask.description || '');
                    setZedate(aTask.zedate || '');
                    setReminder(aTask.reminder || false);
                } else {
                    // Handle case where task ID is not found
                    console.warn(`Task with ID ${taskId} not found.`);
                    // Optionally navigate away or show an error
                    // navigate('/'); // Example: navigate back home
                    setTaskToEdit(null); // Ensure state is null if not else                    found
                }
            }
            // Add tasks and params.taskId as dependencies
        }
        initTask();
    }, [tasks, params.taskId]); //

    // --- Handle form input changes ---
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleDateChange = (e) => setZedate(e.target.value);
    const handleReminderChange = (e) => setReminder(e.target.checked); // Use checked for checkbox

    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const editedTask = {
            id: taskToEdit.id, description: formData.get('description'),
            zedate: formData.get('zedate'),
            reminder: formData.get('reminder')
        }
        editTask(editedTask)
        navigate("/")

    }
    return (
        <div className="container">
            {taskToEdit ? taskToEdit.description : 'No task selected'}
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Task</label>
                    <input type='text' placeholder='AddTask' required
                           id='description'
                           name='description'
                           value={description}
                           onChange={handleDescriptionChange}
                    />
                </div>
                <div className='form-control'>
                    <label>Date and Time</label>
                    <input type='text' placeholder='Date and Time'
                           id='zedate'
                           name='zedate'
                           value={zedate}
                           onChange={handleDateChange}
                    />
                </div>
                <div className='form-control form-control-check'>
                    <label>Set Reminder</label>
                    <input type='checkbox'
                           id='reminder'
                           name='reminder'
                           value={reminder}
                           onChange={handleReminderChange}
                    />
                </div>
                <input type='submit' value='Save Task' className='btn btn-block'/>
            </form>
        </div>
    )
}
export default EditTask;