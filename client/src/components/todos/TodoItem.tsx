import Checkbox from "@/atoms/Checkbox";
import styled from "styled-components";
import Image from "next/image";
import { ITodo } from "@/utils/types";

const TodoItem = ({
  todo,
  onChange,
  onDelete,
}: {
  todo: ITodo;
  onChange: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="d-flex flex-row align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <Checkbox
          // defaultChecked={todo.isCompleted}
          checked={todo.isCompleted}
          onChange={() => {
            todo.id && onChange(todo.id);
          }}
        />
        <Text>{todo.title}</Text>
      </div>
      <Remove
        onClick={() => {
          todo.id && onDelete(todo.id);
        }}
      >
        <Image
          priority
          src="/images/remove.svg"
          height={11}
          width={11}
          alt="remove"
        />
      </Remove>
    </div>
  );
};

const Text = styled.div`
  font-family: MarkPro;
  font-size: 16px;
  margin-left: 14px;
`;

const Remove = styled.div`
  cursor: pointer;
`;

export default TodoItem;
