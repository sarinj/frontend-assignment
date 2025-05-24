import { useTodo } from "../hooks/useTodo"
import TodoCard from "./TodoCard"

export default function TodoSelection() {
  const { todoList, selectTodo } = useTodo()

  return (
    <div className="flex flex-col gap-2 px-4">
      {todoList.map((todo) => (
        <TodoCard
          key={todo.name}
          todo={todo}
          className="w-full"
          onClick={() => selectTodo(todo)}
        />
      ))}
    </div>
  )
}
