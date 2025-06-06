import { TodoTypeEnum } from "../constants/enum"
import TodoSelection from "./TodoSelection"
import TodoTable from "./TodoTable"

export default function TodoList() {
  return (
    <div className="grid grid-cols-3 gap-2 min-h-[650px]">
      <TodoSelection />
      <TodoTable type={TodoTypeEnum.Fruit} />
      <TodoTable type={TodoTypeEnum.Vegetable} />
    </div>
  )
}
