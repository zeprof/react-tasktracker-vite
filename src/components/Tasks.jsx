import {useState} from "react";


const Tasks = () => {
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
    return (
        <>
            {tasks.map((task) => (
                <h3 key={task.id}>{task.text}</h3>
            ))}
        </>
    )
}

export default Tasks
