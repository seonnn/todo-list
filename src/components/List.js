import React, { useState } from "react";

const List = React.memo(
  ({
    id,
    title,
    completed,
    todoData,
    setTodoData,
    provided,
    snapshot,
    handleRemove,
  }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const toggleIsEdit = () => setIsEdit(!isEdit);

    const handleQuitEdit = () => {
      setNewTitle(title);
      setIsEdit(false);
    };

    const handleChangeComplete = (id) => {
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      setTodoData(newTodoData);
    };

    // Basic Mission2: 할 일 목록 수정 기능 추가
    const onEdit = (id, newTitle) => {
      setTodoData(
        todoData.map((data) =>
          data.id === id ? { ...data, title: newTitle } : data
        )
      );
    };

    const handleEdit = () => {
      const regex = / /gi;
      const spaceRemovedNewTitle = newTitle.replace(regex, "");
      if (spaceRemovedNewTitle.length < 1) {
        window.alert("수정을 취소합니다.");
        setIsEdit(false);
        return;
      }
      onEdit(id, newTitle);
      setIsEdit(false);
    };

    return (
      <div
        key={id}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        className={`${
          snapshot.isDragging ? "bg-blue-200" : "bg-blue-100"
        } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border-2 border-blue-200 rounded`}
      >
        <div className="items-center">
          <input
            type="checkbox"
            className="mr-2"
            defaultChecked={completed ? true : false}
            onClick={() => handleChangeComplete(id)}
          />
          {isEdit ? (
            <>
              <input
                value={newTitle}
                placeholder="할 일을 입력해주세요."
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </>
          ) : (
            <>
              <span className={completed ? "line-through" : undefined}>
                {title}
              </span>
            </>
          )}
        </div>
        <div>
          {isEdit ? (
            <>
              <button
                className="px-4 py-2 float-right"
                onClick={handleQuitEdit}
              >
                수정취소
              </button>
              <button className="px-4 py-2 float-right" onClick={handleEdit}>
                수정완료
              </button>
            </>
          ) : (
            <>
              <button
                className="px-4 py-2 float-right"
                onClick={() => handleRemove(id)}
              >
                삭제
              </button>
              <button className="px-4 py-2 float-right" onClick={toggleIsEdit}>
                수정
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
);

export default List;
