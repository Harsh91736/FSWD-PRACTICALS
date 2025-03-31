// App.jsx (Single File Task Reminder System)
import React, { useState, useEffect } from 'react';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [dueTime, setDueTime] = useState('');
    const [priority, setPriority] = useState('');

    const addTask = () => {
        if (!title || isNaN(dueTime) || isNaN(priority)) {
            console.error('Invalid task data. Ensure title, dueTime, and priority are provided.');
            return;
        }
        const newTask = {
            title,
            dueTime: Date.now() + parseInt(dueTime) * 60000,
            priority: parseInt(priority)
        };
        setTasks(prevTasks => [...prevTasks, newTask].sort((a, b) => a.priority - b.priority));
        setTitle('');
        setDueTime('');
        setPriority('');
    };

    useEffect(() => {
        tasks.forEach(task => {
            const delay = task.dueTime - Date.now();
            if (delay > 0) {
                setTimeout(() => {
                    alert(`Reminder: ${task.title} is due!`);
                }, delay);
            }
        });
    }, [tasks]);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Task Reminder System</h2>
            <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="number" placeholder="Due Time (minutes)" value={dueTime} onChange={(e) => setDueTime(e.target.value)} />
            <input type="number" placeholder="Priority" value={priority} onChange={(e) => setPriority(e.target.value)} />
            <button onClick={addTask}>Add Task</button>
            
            <h3>Upcoming Tasks</h3>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>{task.title} - Due in {Math.round((task.dueTime - Date.now()) / 60000)} min - Priority: {task.priority}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
