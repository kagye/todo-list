import React from 'react';
import { TodoItem } from '../App';
import {
  Button,
  Checkbox,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react';
interface Props {
  children: TodoItem[];
  onClick: (id: number) => void;
  onChecked: (id: number) => void;
}

const TodoDisplay = ({ children, onClick, onChecked }: Props) => {
  return (
    <TableContainer>
      <Table size="sm" variant="simple">
        <Tbody>
          {children.map((item) => (
            <Tr key={item.id}>
              <Td>
                <Checkbox
                  outline="solid green 1px"
                  colorScheme="green"
                  onChange={() => onChecked(item.id)}
                  isChecked={item.completed}
                  borderRadius="2px"
                />
              </Td>
              <Td
                className={` ${item.completed && 'completed'}`}
                onClick={() => onChecked(item.id)}
              >
                {item.description}
              </Td>
              <Td>
                <Button
                  colorScheme="pink"
                  size="xs"
                  variant="outline"
                  onClick={() => onClick(item.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TodoDisplay;
