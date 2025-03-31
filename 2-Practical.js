
let tasks = [];

class Task {
    constructor(title, dueTime, priority) {
        if (!title || typeof title !== 'string') {
            throw new Error('Title is required and must be a string');
        }
        if (!dueTime || typeof dueTime !== 'number' || dueTime < 0) {
            throw new Error('Due time is required and must be a positive number');
        }
        if (!priority || !['high', 'medium', 'low'].includes(priority.toLowerCase())) {
            throw new Error('Priority must be high, medium, or low');
        }

        this.title = title;
        this.dueTime = dueTime;
        this.priority = priority.toLowerCase();
        this.id = Date.now(); 
        this.reminderSent = false;
    }
}

function addTask(title, dueTime, priority) {
    try {
        const newTask = new Task(title, dueTime, priority);
        tasks.push(newTask);
        console.log(`Added new task: ${title}`);
        
        scheduleReminder(newTask);
        
        return newTask;
    } catch (error) {
        console.error('Error adding task:', error.message);
        return null;
    }
}

function sortTasksByPriority() {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    console.log('\nTasks sorted by priority:');
    displayTasks(tasks);
}

function displayTasksDueWithin(timeframe) {
    const currentTime = Date.now();
    const dueTasks = tasks.filter(task => {
        const taskDueTime = currentTime + (task.dueTime * 60000); 
        return taskDueTime <= currentTime + (timeframe * 60000);
    });

    console.log(`\nTasks due within ${timeframe} minutes:`);
    displayTasks(dueTasks);
}

function displayTasks(taskList) {
    if (taskList.length === 0) {
        console.log('No tasks found');
        return;
    }
    taskList.forEach(task => {
        console.log(`- ${task.title} (Priority: ${task.priority}, Due in: ${task.dueTime} minutes)`);
    });
}

function scheduleReminder(task) {
    setTimeout(() => {
        if (!task.reminderSent) {
            console.log(`\nREMINDER: Task "${task.title}" is due now!`);
            task.reminderSent = true;
        }
    }, task.dueTime * 60000); 
}

export {
    addTask,
    sortTasksByPriority,
    displayTasksDueWithin,
    displayTasks
}; 

import { addTask, sortTasksByPriority, displayTasksDueWithin } from './taskReminder.js';

console.log('Task Reminder System Demo\n');

// Add some test tasks
addTask("Complete project report", 2, "high");
addTask("Send email to client", 5, "medium");
addTask("Review documentation", 8, "low");

// Sort tasks by priority
sortTasksByPriority();

// Display tasks due within 10 minutes
displayTasksDueWithin(10); 
