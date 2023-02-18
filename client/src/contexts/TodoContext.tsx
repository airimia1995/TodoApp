import { FilterBy, ITodo } from "@/utils/types";
import { useSession } from "next-auth/react";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import axiosInstance from "@/axios";

type ITodoContext = {
  todoList: ITodo[];
  setTodoList: (data: ITodo[]) => void;
  filterBy: FilterBy;
  setFilterBy: (data: FilterBy) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  createTodo: (title: string) => void;
  loadTodos: () => void;
};

export const TodoContext = createContext({} as ITodoContext);

const TodoProvider = ({ children }: PropsWithChildren<{}>) => {
  const { data }: any = useSession();
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  const api = useMemo(() => {
    return axiosInstance(data?.token);
  }, [data?.token]);

  const loadTodos = useCallback(async () => {
    try {
      const response = await api.get("/todo");
      setTodoList(response.data.todos);
    } catch (e) {
      console.error(e);
    }
  }, [api]);

  const toggleTodo = useCallback(
    async (id: string) => {
      const todo = todoList.find((t) => t.id === id);
      if (!todo) return;
      setTodoList(
        todoList.map((t) =>
          t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
        )
      );
      try {
        await api.put(`/todo/${id}`, {
          ...todo,
          isCompleted: !todo?.isCompleted,
        });
        await loadTodos();
      } catch (e) {
        console.error(e);
      }
    },
    [todoList, api, loadTodos]
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      setTodoList((prev) => {
        const todo = prev.find((t) => t.id === id);
        if (todo) {
          prev.splice(prev.indexOf(todo), 1);
        }
        return [...prev];
      });
      try {
        await api.delete(`/todo/${id}`);
        await loadTodos();
      } catch (e) {
        console.error(e);
      }
    },
    [api, loadTodos]
  );

  const createTodo = useCallback(
    async (title: string) => {
      const todo = { id: "", title, isCompleted: false };
      setTodoList((prev) => {
        return [...prev, todo];
      });
      try {
        await api.post(`/todo`, todo);
        await loadTodos();
      } catch (e) {
        console.error(e);
      }
    },
    [api, loadTodos]
  );

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
          loadTodos,
        } as ITodoContext
      }
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
