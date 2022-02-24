import React from "react";

const List = React.memo(
  ({
    id,
    title,
    completed,
    todoData,
    setTodoData,
    provided,
    snapshot,
    handleClick,
  }) => {
    console.log("List is Rendering");
    const handleChangeComplete = (id) => {
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      setTodoData(newTodoData);
    };

    return (
      <div
        key={id}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        className={`${
          snapshot.isDragging ? "bg-gray-200" : "bg-gray-100"
        } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
      >
        <div className="items-center">
          <input
            type="checkbox"
            className="mr-2"
            defaultChecked={false}
            onClick={() => handleChangeComplete(id)}
          />
          <span className={completed ? "line-through" : undefined}>
            {title}
          </span>
        </div>
        <div>
          <button
            className="px-4 py-2 float-right"
            onClick={() => handleClick(id)}
          >
            X
          </button>
        </div>
      </div>
    );
  }
);

export default List;
