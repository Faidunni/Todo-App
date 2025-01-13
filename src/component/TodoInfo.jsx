import { useState } from "react";
import cross from "../assets/images/icon-cross.svg";

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

export default TodoInfo;
