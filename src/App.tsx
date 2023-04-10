import { useState, useRef } from 'react';
import './App.css';
import TodoDisplay from './components/TodoDisplay';

export interface TodoItem {
  id: number;
  description: string;
  completed: boolean;
}

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const handleDeleteItem = (id: number) => {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));
  };
  const handleOnEnterPressed = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      handleAddItem();
    }
  };
  const handleAddItem = () => {
    if (!inputRef.current) {
      return;
    }

    let todoDescription = inputRef.current.value;
    if (
      !inputRef.current.value ||
      todos.some(
        (todo) =>
          todo.description.toLocaleLowerCase() ===
          todoDescription.toLocaleLowerCase()
      )
    ) {
      return;
    }
    let maxId = todos[todos.length - 1]?.id ?? 0;
    setTodos((previousTodo) => [
      ...previousTodo,
      { id: maxId + 1, description: todoDescription, completed: false },
    ]);

    inputRef.current.value = '';
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        onKeyDown={handleOnEnterPressed}
        ref={inputRef}
        type="text"
        placeholder="No todo yet"
      ></input>
      <button onClick={handleAddItem}>Add to list</button>
      <TodoDisplay onClick={handleDeleteItem}>{todos}</TodoDisplay>
    </div>
  );
}

export default App;
