import { FaTimes, FaPen} from 'react-icons/fa'
import {useNavigate} from "react-router";

const Task = ({task, onDelete, onToggle}) => {
    const navigate = useNavigate();
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`}
             onDoubleClick={() => onToggle(task.id)}
        >
            <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {task.description}
                <span style={{ display: 'flex', gap: '10px' }}>
                <FaPen style={{color: 'green', cursor: 'pointer'}}
                    onClick={()=>navigate('/' + task.id)}/>
                <FaTimes style={{color: 'red', cursor: 'pointer'}}
                    onClick={()=>onDelete(task.id)}/>
                </span>
            </h3>
            <p>{task.zedate}</p>
        </div>
    )
}

export default Task
