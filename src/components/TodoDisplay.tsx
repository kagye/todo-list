import React from 'react';
import { TodoItem } from '../App';
interface Props {
  children: TodoItem[];
}

const TodoDisplay = ({ children }: Props) => {
  return (
    <table>
      {children.map((item) => (
        <tr key={item.id}>
          <td>
            <input type="checkbox"></input>
          </td>
          <td>{item.description}</td>
          <td>
            <button>Delete</button>
          </td>
        </tr>
      ))}
    </table>
  );
};

export default TodoDisplay;
