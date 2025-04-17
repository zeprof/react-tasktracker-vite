const AddTask = ({onAdd}) => {

    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const newTask = {
            description: formData.get('description'),
            zedate: formData.get('zedate'),
            reminder: formData.get('reminder')
        }

        onAdd(newTask);
    }

    return (
        <div className="container">
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Task</label>
                    <input type='text' placeholder='AddTask' required
                           id='description'
                           name='description'
                    />
                </div>
                <div className='form-control'>
                    <label>Date and Time</label>
                    <input type='text' placeholder='Date and Time'
                           id='zedate'
                           name='zedate'
                    />
                </div>
                <div className='form-control form-control-check'>
                    <label>Set Reminder</label>
                    <input type='checkbox'
                           id='reminder'
                           name='reminder'
                    />
                </div>
                <input type='submit' value='Save Task' className='btn btn-block'/>
            </form>
        </div>
    )
}

export default AddTask
