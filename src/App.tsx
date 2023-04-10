import { useState, useRef, useEffect } from 'react';
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

  useEffect(() => {
    retrieveFromLocalStoage();
  }, []);

  const handleDeleteItem = (id: number) => {
    setTodos((previousTodos) => {
      let newTodos = previousTodos.filter((todo) => todo.id !== id);
      saveToLocalStorage(newTodos);
      return newTodos;
    });
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
    setTodos((previousTodo) => {
      let newTodos = [
        ...previousTodo,
        { id: maxId + 1, description: todoDescription, completed: false },
      ];
      saveToLocalStorage(newTodos);
      return newTodos;
    });

    inputRef.current.value = '';
  };

  const handleCheckedItem = (id: number) => {
    let newTodos = todos.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTodos([...newTodos]);
    saveToLocalStorage(newTodos);
  };

  const saveToLocalStorage = (items: TodoItem[]) => {
    localStorage.setItem('todos', JSON.stringify(items));
  };

  const retrieveFromLocalStoage = () => {
    let retrievedValue = localStorage.getItem('todos');
    let serializedTodos: TodoItem[] = JSON.parse(retrievedValue ?? '[]');
    setTodos([...serializedTodos]);
  };

  return (
    <div className="App">
      <div className="todolist">
        <h1>Todo List</h1>
        <input
          onKeyDown={handleOnEnterPressed}
          ref={inputRef}
          type="text"
          placeholder="description"
        ></input>
        <button onClick={handleAddItem}>Add to list</button>
        <TodoDisplay onChecked={handleCheckedItem} onClick={handleDeleteItem}>
          {todos}
        </TodoDisplay>
      </div>
    </div>
  );
}

export default App;
