import { FilterBy, ITodo } from "@/utils/types";
import { createContext, PropsWithChildren, useCallback, useState } from "react";

type ITodoContext = {
  todoList: ITodo[];
  setTodoList: (data: ITodo[]) => void;
  filterBy: FilterBy;
  setFilterBy: (data: FilterBy) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  createTodo: (title: string) => void;
};

export const TodoContext = createContext({} as ITodoContext);

const TodoProvider = ({ children }: PropsWithChildren<{}>) => {
  const [todoList, setTodoList] = useState<ITodo[]>([
    { id: "adas", title: "ada", isCompleted: false },
    { id: "111", title: "2323", isCompleted: true },
    { id: "2424", title: "asdasa", isCompleted: false },
  ]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  const toggleTodo = useCallback((id: string) => {
    setTodoList((prev) => {
      const todo = prev.find((t) => t.id === id);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
      return [...prev];
    });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodoList((prev) => {
      const todo = prev.find((t) => t.id === id);
      if (todo) {
        prev.splice(prev.indexOf(todo), 1);
      }
      return [...prev];
    });
  }, []);

  const createTodo = useCallback((title: string) => {
    setTodoList((prev) => {
      const todo = { id: "", title, isCompleted: false };
      return [...prev, todo];
    });
  }, []);

  return (
    <TodoContext.Provider
      value={
        {
          todoList,
          setTodoList,
          filterBy,
          setFilterBy,
          toggleTodo,
          deleteTodo,
          createTodo,
        } as ITodoContext
      }
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
