import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer({ todosItemsValue, removeAllTodo, windowLocation }) {
  const itemsLeft = todosItemsValue.filter((e) => e.completed == false).length;

  return (
    <footer>
      <div className="items-left">
        {itemsLeft} item{itemsLeft > 1 || itemsLeft < 1 ? "s" : null} left
      </div>

      <Link
        className={windowLocation == "#/" ? "filter-selected" : null}
        to="/"
      >
        All
      </Link>
      <Link
        className={windowLocation == "#/active" ? "filter-selected" : null}
        to="/active"
      >
        Active
      </Link>
      <Link
        className={windowLocation == "#/completed" ? "filter-selected" : null}
        to="/completed"
      >
        Completed
      </Link>

      {itemsLeft !== todosItemsValue.length ? (
        <button
          type="button"
          className="footer-button-clear"
          onClick={() => removeAllTodo()}
        >
          Clear completed
        </button>
      ) : null}
    </footer>
  );
}

export default Footer;
