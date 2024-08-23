import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";
import { useState } from "react";

const TrashIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #ff4d4f;
  &:hover {
    color: #ff7875;
  }
`;

const EditIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #ff792f;
  margin-left: 5px;
  &:hover {
    color: #ffa940;
  }
`;

const TaskItemContainer = styled.div`
  opacity: ${({ $isDragging }) => ($isDragging ? 0.5 : 1)};
  background-color: #fff375;
  padding: 10px;
  margin: 10px auto;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 600px;
`;

const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const TaskTitleCell = styled.div`
  color: #ff792f;
  font-size: 1.2em;
  padding-right: 10px;
`;

const TrashIconCell = styled.div`
  display: flex;
  align-items: center;
`;

const TaskTextContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 5px 0;
`;

const TaskTextCell = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: ${({ $done, $status }) =>
    $done
      ? "gray"
      : $status === "To do"
      ? "black"
      : $status === "Doing"
      ? "green"
      : "gray"};
`;

const TaskItem = ({ task, index, removeTask, updateTask, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => {
      onDrop(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [isEditingText, setIsEditingText] = useState(null);
  const [editedTexts, setEditedTexts] = useState(task.texts);

  const handleRemoveText = (textIndex) => {
    const updatedTexts = task.texts.filter((_, i) => i !== textIndex);
    updateTask(task.id, { ...task, texts: updatedTexts });
  };

  const handleMarkDone = (textIndex) => {
    const updatedTexts = task.texts.map((text, i) =>
      i === textIndex ? { ...text, done: !text.done } : text
    );

    const allDone = updatedTexts.every((text) => text.done);

    updateTask(task.id, {
      ...task,
      texts: updatedTexts,
      status: allDone ? "Done" : task.status,
    });
  };

  const handleSaveTitle = () => {
    updateTask(task.id, { ...task, title: editedTitle });
    setIsEditingTitle(false);
  };

  const handleSaveText = (textIndex) => {
    const updatedTexts = [...editedTexts];
    updateTask(task.id, { ...task, texts: updatedTexts });
    setIsEditingText(null);
  };

  const handleKeyDown = (e, saveFunction) => {
    if (e.key === "Enter") {
      saveFunction();
    }
  };

  return (
    <TaskItemContainer ref={drag} $isDragging={isDragging}>
      <TaskHeader>
        {isEditingTitle ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, handleSaveTitle)}
            autoFocus
          />
        ) : (
          <TaskTitleCell>{task.title}</TaskTitleCell>
        )}
        <TrashIconCell>
          <EditIcon
            onClick={() => {
              if (isEditingTitle) handleSaveTitle();
              else setIsEditingTitle(true);
            }}
          >
            ✏️
          </EditIcon>
          <TrashIcon onClick={() => removeTask(task.id)}>❌</TrashIcon>
        </TrashIconCell>
      </TaskHeader>
      {task.texts.map((taskText, textIndex) => (
        <TaskTextContainer key={textIndex}>
          <TaskTextCell $done={taskText.done} $status={task.status}>
            <input
              type="checkbox"
              checked={taskText.done}
              onChange={() => handleMarkDone(textIndex)}
            />
            <span
              style={{
                textDecoration: taskText.done ? "line-through" : "none",
              }}
            >
              {isEditingText === textIndex ? (
                <input
                  type="text"
                  value={editedTexts[textIndex].text}
                  onChange={(e) =>
                    setEditedTexts((prevTexts) => {
                      const updatedTexts = [...prevTexts];
                      updatedTexts[textIndex].text = e.target.value;
                      return updatedTexts;
                    })
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, () => handleSaveText(textIndex))
                  }
                  autoFocus
                />
              ) : (
                taskText.text
              )}
            </span>
          </TaskTextCell>
          <TrashIconCell>
            <EditIcon
              onClick={() => {
                if (isEditingText === textIndex) handleSaveText(textIndex);
                else setIsEditingText(textIndex);
              }}
            >
              ✏️
            </EditIcon>
            <TrashIcon onClick={() => handleRemoveText(textIndex)}>
              ✖️
            </TrashIcon>
          </TrashIconCell>
        </TaskTextContainer>
      ))}
    </TaskItemContainer>
  );
};

export default TaskItem;
