import Distance from "@/atoms/DistanceH";
import Input from "@/atoms/Input";
import Title from "@/atoms/Typography";
import axiosInstance from "@/axios";
import TodoList from "@/components/todos/TodoList";
import { TodoContext } from "@/contexts/TodoContext";
import { getToken } from "next-auth/jwt";
import { getSession, useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Todos = (props: any) => {
  const [title, setTitle] = useState("");
  const { createTodo, loadTodos } = useContext(TodoContext);
  const { status } = useSession();

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

  useEffect(() => {
    if (status === "authenticated") {
      loadTodos();
    }
  }, [status, loadTodos]);

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
export async function getServerSideProps(context: any) {
  const { req } = context;
  const token = await getToken({ req });
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
