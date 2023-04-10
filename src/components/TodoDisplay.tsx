import React from 'react';
import { TodoItem } from '../App';
interface Props {
  children: TodoItem[];
  onClick: (id: number) => void;
  onChecked: (id: number) => void;
}

const TodoDisplay = ({ children, onClick, onChecked }: Props) => {
  return (
    <table>
      <tbody>
        {children.map((item) => (
          <tr key={item.id}>
            <td>
              <input
                onChange={() => onChecked(item.id)}
                checked={item.completed}
                type="checkbox"
              ></input>
            </td>
            <td>{item.description}</td>
            <td>
              <button onClick={() => onClick(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoDisplay;
