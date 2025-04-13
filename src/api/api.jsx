const BASE_URL='http://localhost:8080'

export async function fetchTasks() {
    const res = await fetch(`${BASE_URL}/todos`)
    return await res.json()
}

export async function fetchTask(id){
    const res = await fetch(`${BASE_URL}/todos/${id}`)
    return await res.json()
}

export async function postTask(task) {
    const res = await fetch(`${BASE_URL}/todos`,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(task)
        })
    return res
}

export async function deleteTaskById(id) {
    await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'DELETE'
    })
}

export async function toggleReminderByTask(task) {
    await fetch(`${BASE_URL}/todos/${task.id}`,
        {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
}