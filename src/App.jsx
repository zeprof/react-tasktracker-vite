
import './App.css';
import Header from './components/Header.jsx'
import Tasks from './components/Tasks.jsx'


function App() {
    return (
        <div className='container'>
            <Header title="Task Tracker"/>
            <Tasks />
        </div>
    );
}

export default App;
