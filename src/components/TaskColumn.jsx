import React from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import TaskItem from "./TaskItem";

const ColumnWrapper = styled.div`
  background: #f8f9fa;
  padding: 10px;
  border-radius: 10px;
  flex: 1;
  min-height: 200px;
`;

const TaskColumn = ({ status, tasks, removeTask, updateTask, moveTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <ColumnWrapper
      ref={drop}
      style={{ backgroundColor: isOver ? "#e0e0e0" : "#f8f9fa" }}
    >
      <h2>{status}</h2>
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          removeTask={removeTask}
          updateTask={updateTask}
        />
      ))}
    </ColumnWrapper>
  );
};

export default TaskColumn;
