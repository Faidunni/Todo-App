import { useState } from "react";
import Heading from "./component/Heading";
import Form from "./component/Form";
import InputBox from "./component/InputBox";
import TodoInfo from "./component/TodoInfo";

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
      <Form>
        <Heading isLight={isLight} onClickIcon={HandleIcon} />
        <InputBox
          isLight={isLight}
          addItem={handleSubmit}
          description={description}
          setTodoText={setDescription}
        />
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

export default App;
