import type { TodoTypeEnum } from "../constants/enum"
import { useTodo } from "../hooks/useTodo"
import TodoCard from "./TodoCard"

interface TodoTableProps {
  type: TodoTypeEnum
}

export default function TodoTable({ type }: TodoTableProps) {
  const { selectedList, unSelectTodo } = useTodo()

  return (
    <div className="border-2 border-gray-300 rounded-md flex flex-col h-full">
      <div className="bg-gray-200 p-2 rounded-t-md">
        <h2 className="text-xl font-bold text-center">{type}</h2>
      </div>
      <div className="flex flex-col gap-2 p-2 flex-grow overflow-y-auto">
        {selectedList[type]?.map((todo) => (
          <TodoCard
            key={todo.name}
            todo={todo}
            onClick={() => unSelectTodo(todo.name)}
          />
        ))}
      </div>
    </div>
  )
}
