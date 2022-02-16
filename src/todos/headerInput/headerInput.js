import React, { useEffect, useRef, useState } from "react";
import "./headerInput.css";

function HeaderInput({ addNewTodo }) {
  const [title, setTitle] = useState("");
  const headerInputRef = useRef(null);

  useEffect(() => {
    headerInputRef.current.focus();
  });

  const addTodo = (event) => {
    setTitle(event.target.value);
    if (event.code === "Enter" && event.target.value.trim()) {
      addNewTodo(event);
      setTitle("");
    }
  };

  return (
    <input
      placeholder="What needs to be done?"
      className="header-input"
      onInput={addTodo}
      onKeyDown={addTodo}
      value={title}
      ref={headerInputRef}
    ></input>
  );
}

export default HeaderInput;
