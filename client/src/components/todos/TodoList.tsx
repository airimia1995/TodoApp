import Distance from "@/atoms/DistanceH";
import Filter from "./Filter";
import TodoItem from "./TodoItem";

const TodoList = () => {
  return (
    <div>
      <TodoItem />
      <Distance distance={16} />
      <TodoItem />
      <Distance distance={16} />
      <TodoItem />
      <Distance distance={16} />
      <TodoItem />
      <Distance distance={16} />
      <Distance distance={35} />
      <Filter />
    </div>
  );
};

export default TodoList;
