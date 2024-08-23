import React, { useState } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Adjust the space between inputs */
  margin-bottom: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const AddButton = styled.button`
  margin-top: 10px; /* Space between the last input and the add button */
`;

const InputSection = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("To do");
  const [taskTexts, setTaskTexts] = useState([""]);
  const [error, setError] = useState("");

  const handleAddTask = () => {
    if (!title.trim()) {
      setError("Task title cannot be empty");
      return;
    }

    if (taskTexts.some((text) => !text.trim())) {
      setError("Task text cannot be empty");
      return;
    }

    setError("");
    addTask(
      title,
      status,
      taskTexts.map((text) => ({ text, done: false }))
    );
    setTitle("");
    setTaskTexts([""]);
  };

  return (
    <InputWrapper>
      <InputGroup>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="To do">To do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
        {taskTexts.map((taskText, index) => (
          <div
            key={index}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <input
              type="text"
              placeholder="Task Text"
              value={taskText}
              onChange={(e) => {
                const newTaskTexts = [...taskTexts];
                newTaskTexts[index] = e.target.value;
                setTaskTexts(newTaskTexts);
              }}
            />
            {index === taskTexts.length - 1 && (
              <button onClick={() => setTaskTexts([...taskTexts, ""])}>
                +
              </button>
            )}
          </div>
        ))}
      </InputGroup>
      <AddButton onClick={handleAddTask}>Add Task</AddButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default InputSection;
