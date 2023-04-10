import './App.css';
import TodoDisplay from './components/TodoDisplay';

export interface TodoItem {
  id: number;
  description: string;
}

const sampleTodo = [
  {
    id: 1,
    description: 'Lorem ipsum dolor sit amet',
  },
  {
    id: 2,
    description: 'Lorem, ipsum dolor',
  },
];

function App() {
  return (
    <div className="App">
      <h1>Todo List</h1>
      <input type="text" placeholder="No todo yet"></input>
      <button>Add to list</button>
      <TodoDisplay>{sampleTodo}</TodoDisplay>
    </div>
  );
}

export default App;
