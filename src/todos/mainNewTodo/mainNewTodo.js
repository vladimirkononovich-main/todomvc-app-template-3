import React, { useEffect, useRef, useState } from "react";
import "./mainNewTodo.css";

function MainNewTodo({
  id,
  todosItemsValue,
  editingNewTodo,
  removeTodo,
  toggleTodo,
}) {
  const newTodoInput = useRef(null);
  const defaultInputStyle = ["none", "flex"];
  const [styleAttr, setStyleAttr] = useState([...defaultInputStyle]);
  useEffect(() => {
    newTodoInput.current.focus();
    newTodoInput.current.value = currentTitle;
  });

  const currentTitle = todosItemsValue.find((elem) => elem.id === id).title;
  const isCompleted = todosItemsValue
    .map((elem) => {
      if (elem.id === id && elem.completed === true) {
        return "main-new-todo-title-completed";
      }
    })
    .join("");

  const hiddenNewTodoInput = (event) => {
    const title = event.target.value.trim();

    if (event.code == "Enter") {
      if (title == "") removeTodo(id);
      else {
        editingNewTodo(title, id);
        setStyleAttr([...defaultInputStyle]);
      }
    }
    if (event.code == "Escape") {
      editingNewTodo(currentTitle, id);
      setStyleAttr([...defaultInputStyle]);
    }
    if (!event.code) {
      if (title == "") removeTodo(id);
      else {
        editingNewTodo(title, id);
        setStyleAttr([...defaultInputStyle]);
      }
    }
  };

  return (
    <div className="main-new-todo-wrapper">
      <input
        type="checkbox"
        className="main-new-todo-select-wrapper"
        onChange={() => toggleTodo(id)}
        checked={todosItemsValue
          .map((e) => (e.id == id && e.completed == true ? " " : ""))
          .join("")}
      />
      <input
        className="main-new-todo-input"
        style={{ display: styleAttr[0] }}
        defaultValue={currentTitle}
        onKeyDown={hiddenNewTodoInput}
        onBlur={hiddenNewTodoInput}
        ref={newTodoInput}
      />
      <div
        className="main-new-todo-title-wrapper"
        onDoubleClick={() => setStyleAttr([...styleAttr].reverse())}
        style={{ display: styleAttr[1] }}
      >
        <h2 className={"main-new-todo-title" + " " + isCompleted}>
          {currentTitle}
        </h2>
        <div
          className="main-new-todo-destroy"
          onClick={() => removeTodo(id)}
        ></div>
      </div>
    </div>
  );
}
export default MainNewTodo;
