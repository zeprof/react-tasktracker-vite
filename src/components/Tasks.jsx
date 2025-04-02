const tasks = [
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

const Tasks = () => {
    return (
        <>
            {tasks.map((task) => (<h3>{task.text}</h3>))}
        </>
    )
}

export default Tasks
