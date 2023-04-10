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
      <input ref={inputRef} type="text" placeholder="No todo yet"></input>
      <button onClick={handleAddItem}>Add to list</button>
      <TodoDisplay>{todos}</TodoDisplay>
    </div>
  );
}

export default App;
