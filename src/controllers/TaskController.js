import { useState, useEffect } from 'react';

const useTaskController = () => {
    const [tasks, setTasks] = useState(() => {
        // Retrieve tasks from local storage when the component mounts
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        // Save tasks to local storage whenever tasks change
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (title, status, texts) => {
        setTasks([
            ...tasks,
            { id: Date.now(), title, status, texts }
        ]);
    };

    const removeTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const updateTask = (taskId, updatedTask) => {
        setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
    };

    const moveTask = (taskId, newStatus) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, status: newStatus } : task
        ));
    };

    return { tasks, addTask, removeTask, updateTask, moveTask };
};

export default useTaskController;
