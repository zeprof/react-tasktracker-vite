const BASE_URL = 'http://localhost:8080'

export async function fetchTasks() {
    //debugger

    try {
        const res = await fetch(`${BASE_URL}/todos`);

        if (!res.ok) {
            await manageError(res)
        }
        return await res.json();

    } catch (networkError) {
        console.error('Network error fetching tasks:', networkError);
        // Re-throw a user-friendly error or a specific error type
        throw new Error('Failed to connect to the server. Please check your network connection.');
    }

}

export async function fetchTask(id) {
    try {
        const res = await fetch(`${BASE_URL}/todos/${id}`);
        if (!res.ok) {
            await manageError(res);
        }
        return await res.json();
    } catch (networkError) {
        console.error(`Network error fetching task ${id}:`, networkError);
        throw new Error('Failed to connect to the server.');
    }
}

export async function postTask(task) {
    try {
        const res = await fetch(`${BASE_URL}/todos`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(task)
        });

        if (!res.ok) {
            await manageError(res);
        }
        // Decide what to return on success, maybe the created task?
        // If the server returns the created task with an ID:
        return res
        // Or just return the response if you only need the status
        // return res;
    } catch (networkError) {
        console.error('Network error posting task:', networkError);
        throw new Error('Failed to connect to the server.');
    }
}

export async function deleteTaskById(id) {
    try {
        const res = await fetch(`${BASE_URL}/todos/${id}`, {
            method: 'DELETE'
        })
        if (!res.ok) {
            await manageError(res);
        }
    } catch (networkError) {
        console.error(`Network error deleting task ${id}:`, networkError);
        throw new Error('Failed to connect to the server.');
    }
}

export async function toggleReminderByTask(task) {
    try {
        const res = await fetch(`${BASE_URL}/todos/${task.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(task)
            })
        if (!res.ok) {
            await manageError(res);
        }
    } catch (networkError) {
        console.error(`Network error toggling reminder for task ${task.id}:`, networkError);
        throw new Error('Failed to connect to the server.');
    }
}

async function manageError(res) {
    let errorData;
    try {
        errorData = await res.json();
    } catch (e) {
        errorData = {message: res.statusText};
    }
    const error = new Error(errorData?.message || `HTTP error! Status: ${res.status}`);
    error.status = res.status;
    error.data = errorData;
    throw error;
}