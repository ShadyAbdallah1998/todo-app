import React from "react";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "./TaskColumn";

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const TaskBoard = ({ tasks, removeTask, updateTask, moveTask }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <BoardWrapper>
        {["To do", "Doing", "Done"].map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
            removeTask={removeTask}
            updateTask={updateTask}
            moveTask={moveTask}
          />
        ))}
      </BoardWrapper>
    </DndProvider>
  );
};

export default TaskBoard;
