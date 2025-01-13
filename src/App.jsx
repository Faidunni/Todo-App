import React from "react";
import Moon from "./assets/images/icon-moon.svg";
import sun from "./assets/images/icon-sun.svg";
import cross from "./assets/images/icon-cross.svg";
import { useState } from "react";

function App() {
  const [isLight, setIsLight] = useState(true);
  const [newTodo, setNewTodo] = useState([]);
  const [description, setDescription] = useState("");

  // add new item
  function handleAddItem(todo) {
    setNewTodo((newTodo) => [...newTodo, todo]);
  }

  // Toggle dark-mode Icon
  function HandleIcon() {
    setIsLight((isLight) => !isLight);
  }

  // delete Todo
  function handleDelete(id) {
    setNewTodo((newTodo) => newTodo.filter((todo) => todo.id !== id));
  }

  // mark as completew
  function handleToggleItem(id) {
    setNewTodo((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isComplete: !item.isComplete } : item
      )
    );
  }

  // calculate number of things to do left
  const numLeft = newTodo.filter((todo) => !todo.isComplete).length;

  // submit todo-form
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newTodoItem = { description, id: Date.now(), isComplete: false };
    console.log(newTodoItem);

    setDescription("");
    handleAddItem(newTodoItem);
  }

  // clear todo
  function ClearAll() {
    setNewTodo("");
  }

  return (
    <main className={isLight ? "container" : "container-dark"}>
      <Form
        isLight={isLight}
        onClickIcon={HandleIcon}
        addItem={handleSubmit}
        description={description}
        setTodoText={setDescription}
      >
        <TodoInfo
          todo={newTodo}
          onDelete={handleDelete}
          description={description}
          onToggle={handleToggleItem}
          clearToggle={ClearAll}
          numLeft={numLeft}
          isLight={isLight}
        />
      </Form>
    </main>
  );
}

function Form({
  isLight,
  onClickIcon,
  addItem,
  description,
  setTodoText,
  children,
}) {
  return (
    <section className="form">
      <div className="todo">
        <h1>TODO</h1>
        <div onClick={onClickIcon}>
          {isLight ? <img src={Moon} alt="" /> : <img src={sun} alt={sun} />}
        </div>
      </div>
      <div className={isLight ? "input-box" : "input-box-dark"}>
        <div className="circle" onClick={addItem}></div>
        <input
          type="text"
          value={description}
          placeholder="Create new todo"
          onChange={(e) => setTodoText(e.target.value)}
          className={isLight ? "input-light" : "input-dark"}
        />
      </div>
      {children}
    </section>
  );
}

function TodoInfo({ todo, onDelete, onToggle, clearToggle, numLeft, isLight }) {
  //   filter Item based on a condition
  const [sortedBy, setSortedBy] = useState("All");
  let sortedTodo;

  if (sortedBy === "All") {
    sortedTodo = todo;
  } else if (sortedBy === "Active") {
    sortedTodo = todo.filter((todos) => !todos.isComplete);
  } else if (sortedBy === "Completed") {
    sortedTodo = todo.filter((todos) => todos.isComplete);
  }

  if (todo.length === 0) {
    return null;
  }
  return (
    <div className={isLight ? "todo-text" : "todo-text-dark"}>
      {sortedTodo.map((todoText) => (
        <ul key={todoText.id} className="content">
          <div>
            <label className="checkbox-container">
              <input
                type="checkbox"
                onChange={() => onToggle(todoText.id)}
                checked={todoText.isComplete}
              />
              <span className="circle"></span>
            </label>

            <p
              style={
                todoText.isComplete
                  ? {
                      textDecoration: "line-through",
                      color: "hsl(233, 11%, 84%)",
                      fontSize: "20px",
                    }
                  : { fontSize: "20px" }
              }
              className={isLight ? "text-light" : "text-dark"}
            >
              {todoText.description}
            </p>
          </div>

          <img src={cross} alt="cross" onClick={() => onDelete(todoText.id)} />
        </ul>
      ))}

      <div className={isLight ? "footer" : "footer-dark"}>
        <p>{numLeft} items left</p>

        <div className="sort-text">
          <button onClick={() => setSortedBy("All")}>All</button>
          <button onClick={() => setSortedBy("Active")}>Active</button>
          <button onClick={() => setSortedBy("Completed")}>Completed</button>
        </div>

        <button onClick={clearToggle}>Clear all</button>
      </div>
    </div>
  );
}

export default App;
