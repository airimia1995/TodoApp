import Distance from "@/atoms/DistanceH";
import Input from "@/atoms/Input";
import Title from "@/atoms/Typography";
import TodoList from "@/components/todos/TodoList";
import { TodoContext } from "@/contexts/TodoContext";
import { useCallback, useContext, useRef, useState } from "react";
import styled from "styled-components";

const Todos = () => {
  const [title, setTitle] = useState("");

  const { createTodo } = useContext(TodoContext);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        createTodo(title);
        setTitle("");
      }
    },
    [createTodo, setTitle, title]
  );

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  return (
    <Container className="d-flex flex-column">
      <Title>Todo list</Title>
      <Distance distance={35} />
      <Input
        id="addTodo"
        value={title}
        placeholder="Add a new todo"
        onKeyDown={handleKeyDown}
        onChange={onChange}
      />
      <Distance distance={27} />
      <TodoList />
    </Container>
  );
};

const Container = styled.div`
  width: 440px;
`;

export default Todos;
