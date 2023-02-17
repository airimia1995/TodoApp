import Distance from "@/atoms/DistanceH";
import { TodoContext } from "@/contexts/TodoContext";
import { FilterBy } from "@/utils/types";
import { useContext, useMemo } from "react";
import styled from "styled-components";
import Filter from "./Filter";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todoList, toggleTodo, deleteTodo, filterBy } =
    useContext(TodoContext);

  const filterTodoList = useMemo(() => {
    switch (filterBy) {
      case FilterBy.All:
        return todoList;
      case FilterBy.Completed:
        return todoList.filter((item) => item.isCompleted);
      case FilterBy.Incompleted:
        return todoList.filter((item) => !item.isCompleted);
    }
  }, [filterBy, todoList]);

  return (
    <div>
      <Container>
        {filterTodoList.map((item) => (
          <>
            <TodoItem
              key={item.id}
              todo={item}
              onChange={toggleTodo}
              onDelete={deleteTodo}
            />
            <Distance distance={16} />
          </>
        ))}
      </Container>
      <Distance distance={35} />
      <Filter />
    </div>
  );
};

const Container = styled.div`
  height: 200px;
  overflow-y: scroll;
`;

export default TodoList;
