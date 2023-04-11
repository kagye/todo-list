import { useState, useRef, useEffect } from 'react';
import './App.css';
import TodoDisplay from './components/TodoDisplay';
import { Button, Input, VStack, Text } from '@chakra-ui/react';

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

    let todoDescription = inputRef.current.value.trim();
    let invalidTodoItem =
      !inputRef.current.value ||
      todos.some(
        (todo) =>
          todo.description.toLocaleLowerCase() ===
          todoDescription.toLocaleLowerCase()
      );

    if (invalidTodoItem) {
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
    inputRef.current.focus();
  };

  const handleClearAllItem = () => {
    setTodos([]);
    saveToLocalStorage([]);
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
        <VStack spacing="1em">
          <Text as="b" fontSize="2xl">
            Todo List
          </Text>
          <Input
            borderRadius="8px"
            width="15em"
            className="entry"
            onKeyDown={handleOnEnterPressed}
            ref={inputRef}
            type="text"
            placeholder="new todo"
            variant="filled"
            size="sm"
            outline="solid 1px teal"
          ></Input>
          <Button
            colorScheme="blue"
            size="sm"
            variant="solid"
            onClick={handleAddItem}
          >
            Add to list
          </Button>

          <TodoDisplay onChecked={handleCheckedItem} onClick={handleDeleteItem}>
            {todos}
          </TodoDisplay>
          {todos.length > 0 && (
            <Button
              colorScheme="red"
              size="sm"
              variant="solid"
              onClick={handleClearAllItem}
            >
              Clear
            </Button>
          )}
        </VStack>
      </div>
    </div>
  );
}

export default App;
