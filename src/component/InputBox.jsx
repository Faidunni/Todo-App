import React from "react";

function InputBox({ isLight, addItem, description, setTodoText }) {
  return (
    <form
      className={isLight ? "input-box" : "input-box-dark"}
      onSubmit={addItem}
    >
      <div className="circle" onClick={addItem}></div>
      <input
        type="text"
        value={description}
        placeholder="Create new todo"
        onChange={(e) => setTodoText(e.target.value)}
        className={isLight ? "input-light" : "input-dark"}
      />
    </form>
  );
}

export default InputBox;
