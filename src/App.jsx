
import './App.css';
import Header from './components/Header.jsx'
import Tasks from './components/Tasks.jsx'
import {useState} from "react";


function App() {
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

    const deleteTask = (id) => {
        console.log('delete', id)
    }

    return (
        <div className='container'>
            <Header title="Task Tracker"/>
            <Tasks tasks={tasks} onDelete={deleteTask}/>
        </div>
    );
}

export default App;
