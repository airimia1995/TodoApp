import Distance from "@/atoms/DistanceH";
import { TodoContext } from "@/contexts/TodoContext";
import { FilterBy, ITodo } from "@/utils/types";
import { useContext, useMemo } from "react";
import styled from "styled-components";
import Filter from "./Filter";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todoList, toggleTodo, deleteTodo, filterBy } =
    useContext(TodoContext);

  const filterTodoList = useMemo(() => {
    const sorted = (list: ITodo[]) => {
      return list.sort(function (a, b) {
        return (
          new Date(b.createdAt || "").getTime() -
          new Date(a.createdAt || "").getTime()
        );
      });
    };
    switch (filterBy) {
      case FilterBy.All:
        return sorted(todoList);
      case FilterBy.Completed:
        return sorted(todoList.filter((item) => item.isCompleted));
      case FilterBy.Incompleted:
        return sorted(todoList.filter((item) => !item.isCompleted));
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
