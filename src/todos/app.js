import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import HeaderInput from "./headerInput/headerInput";
import HeaderTitle from "./headerTitle/headerTitle";
import "./app.css";
import HeaderButton from "./headerButton/headerButton";
import MainNewTodo from "./mainNewTodo/mainNewTodo";
import Footer from "./footer/footer";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";

function App() {
  const [todosItemsValue, setTodosItems] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [windowLocation, setWindowLocation] = useState(window.location.hash);
  const navigate = useNavigate();

  useEffect(() => {
    if (windowLocation !== window.location.hash) {
      setWindowLocation(window.location.hash);
    }
    if (
      windowLocation !== "#/" &&
      windowLocation !== "#/active" &&
      windowLocation !== "#/completed"
    ) {
      navigate("#");
    }
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosItemsValue));
  }, [todosItemsValue]);

  const addNewTodo = (event) => {
    setTodosItems([
      ...todosItemsValue,
      {
        title: event.target.value,
        id: performance.now(),
        completed: false,
      },
    ]);
  };
  const editingNewTodo = (title, id) => {
    setTodosItems(
      todosItemsValue.map((elem) => {
        if (elem.id == id) {
          return { ...elem, title: title };
        }
        return elem;
      })
    );
  };
  const removeTodo = (id) => {
    setTodosItems(
      todosItemsValue.filter((elem) => {
        if (elem.id !== id) return elem;
      })
    );
  };
  const removeAllTodo = () => {
    setTodosItems(
      todosItemsValue.filter((elem) => {
        return elem.completed === false;
      })
    );
  };
  const toggleTodo = (id) => {
    setTodosItems(
      todosItemsValue.map((elem) => {
        if (elem.id === id) {
          return { ...elem, completed: !elem.completed };
        }
        return elem;
      })
    );
  };
  const toggleAllTodo = () => {
    const allNotCompleted = todosItemsValue.every((e) => e.completed === true);

    setTodosItems(
      todosItemsValue.map((elem) => {
        if (allNotCompleted == true) return { ...elem, completed: false };
        else {
          return { ...elem, completed: true };
        }
      })
    );
  };

  const filteredTodos = todosItemsValue.filter((elem) => {
    switch (windowLocation) {
      case "#/":
        return elem;
      case "#/active":
        return elem.completed == false;
      case "#/completed":
        return elem.completed == true;
    }
  });

  return (
    <>
      <HeaderTitle />
      <div className="main-wrapper">
        <div className="input-wrapper">
          <div className="button-wrapper">
            {todosItemsValue.length > 0 ? (
              <HeaderButton
                toggleAllTodo={toggleAllTodo}
                todosItemsValue={todosItemsValue}
              />
            ) : null}
          </div>
          <HeaderInput
            addNewTodo={addNewTodo}
            todosItemsValue={todosItemsValue}
          />
        </div>

        {filteredTodos.map((elem) => {
          return (
            <MainNewTodo
              id={elem.id}
              key={elem.id}
              todosItemsValue={todosItemsValue}
              editingNewTodo={editingNewTodo}
              removeTodo={removeTodo}
              toggleTodo={toggleTodo}
            />
          );
        })}

        {todosItemsValue.length > 0 ? (
          <Footer
            todosItemsValue={todosItemsValue}
            removeAllTodo={removeAllTodo}
            windowLocation={windowLocation}
          />
        ) : null}
      </div>
    </>
  );
}

export default App;
