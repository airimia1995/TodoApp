import Distance from "@/atoms/DistanceH";
import Input from "@/atoms/Input";
import Title from "@/atoms/Typography";
import TodoList from "@/components/todos/TodoList";
import { useRef } from "react";
import styled from "styled-components";

const Todos = () => {
  const email = useRef("");
  return (
    <Container className="d-flex flex-column">
      <Title>Todo list</Title>
      <Distance distance={35} />
      <Input
        id="addTodo"
        placeholder="Add a new todo"
        onChange={(e) => (email.current = e.target.value)}
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
