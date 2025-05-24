import type { Todo } from "../hooks/useTodo"
import { cn } from "../utils/className"

interface TodoCardProps {
  todo: Todo
  className?: string
  onClick?: (todo: Todo) => void
}

export default function TodoCard({ todo, className, onClick }: TodoCardProps) {
  const handleClick = () => {
    if (!onClick) return
    onClick(todo)
  }

  return (
    <button
      className={cn(
        "border-2 border-gray-300 rounded-[5px] hover:bg-gray-100 p-2 text-center cursor-pointer font-semibold text-lg",
        className
      )}
      onClick={handleClick}
    >
      {todo.name}
    </button>
  )
}
