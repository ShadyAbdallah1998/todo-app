import React from 'react';
import InputSection from './components/InputSection';
import TaskBoard from './components/TaskBoard';
import useTaskController from './controllers/TaskController';
import GlobalStyles from './styles/GlobalStyles';

function App() {
    const { tasks, addTask, removeTask, updateTask, moveTask } = useTaskController();

    return (
        <>
            <GlobalStyles />
            <div>
                <InputSection addTask={addTask} />
                <TaskBoard 
                    tasks={tasks} 
                    removeTask={removeTask} 
                    updateTask={updateTask} 
                    moveTask={moveTask} 
                />
            </div>
        </>
    );
}

export default App;
