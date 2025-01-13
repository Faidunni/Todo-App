import React from "react";

function InputBox({ isLight, addItem, description, setTodoText }) {
  return (
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
  );
}

export default InputBox;
