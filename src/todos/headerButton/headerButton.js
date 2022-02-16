import React from "react";
import "./headerButton.css";

function HeaderButton({ toggleAllTodo, todosItemsValue }) {
  return (
    <input
      type="radio"
      className="header-button"
      onChange={() => toggleAllTodo()}
      checked={todosItemsValue.every((e) => e.completed == true) ? " " : ""}
    />
  );
}
export default HeaderButton;
