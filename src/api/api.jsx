export async function fetchTasks() {
    const res = await fetch('http://localhost:8080/todos')
    return await res.json()
}

export async function fetchTask(id){
    const res = await fetch(`http://localhost:8080/todos/${id}`)
    return await res.json()
}

export async function postTask(task) {
    const res = await fetch('http://localhost:8080/todos',
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
    await fetch(`http://localhost:8080/todos/${id}`, {
        method: 'DELETE'
    })
}

export async function toggleReminderByTask(task) {
    await fetch(`http://localhost:8080/todos/${task.id}`,
        {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
}