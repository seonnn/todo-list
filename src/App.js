import React, { useState, useCallback, useEffect } from "react";
import "./App.css";

import Lists from "./components/Lists";
import Form from "./components/Form";
import RemoveAll from "./components/RemoveAll";
import TodayDate from "./components/TodayDate";

function App() {
  const [todoData, setTodoData] = useState(
    JSON.parse(localStorage.getItem("todoData")) || []
  );
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Challenge Mission: localStorage에 todoData 저장 기능 추가
  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoData));
  }, [todoData]);

  const handleSubmit = (e) => {
    // e.preventDefault()
    setErrorMessage("");

    // 빈 문자열 입력 시 에러메세지 발생
    const regex = / /gi;
    const spaceRemovedValue = value.replace(regex, "");
    if (value.length === 0 || spaceRemovedValue.length === 0) {
      setErrorMessage("빈 문자열은 입력할 수 없습니다.");
      setValue("");
      return;
    }

    // 같은 할일 입력 시 확인창 발생
    let newTodoData = todoData;
    if (
      newTodoData
        .map((data) => data.title.replace(regex, ""))
        .includes(spaceRemovedValue)
    ) {
      if (!window.confirm("이미 입력된 할 일입니다. 다시 입력하시겠습니까?")) {
        setValue("");
        return;
      }
    }

    //새로운 할 일 데이터 선언 및 투두데이터 리스트에 추가
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };
    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
  };

  const handleRemove = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      setTodoData(newTodoData);
    },
    [todoData]
  );

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="mb-3">
          <div className="flex justify-between items-center mb-4">
            <span className="text-3xl">
              <TodayDate />
            </span>
            <span className="p-2 text-white bg-blue-400 border-2 border-blue-400 rounded hover:text-black hover:border-black">
              <RemoveAll setTodoData={setTodoData} />
            </span>
          </div>

          <div className="flex justify-end items-end">
            {/* 오늘의 할 일, 남은 할 일 count 기능 추가 */}
            오늘의 할 일:{" "}
            {" " + todoData.filter((data) => data.title).length + "개 / "}
            남은 할 일:
            {" " +
              todoData.filter((data) => data.completed === false).length +
              "개"}
          </div>
        </div>
        <Lists
          todoData={todoData}
          setTodoData={setTodoData}
          handleRemove={handleRemove}
        />
        <div className="pt-2">
          <Form
            value={value}
            setValue={setValue}
            handleSubmit={handleSubmit}
            setErrorMessage={setErrorMessage}
          />
        </div>
        <p className="mt-2 text-red-500">{errorMessage}</p>
      </div>
    </div>
  );
}

export default App;
