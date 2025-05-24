import { createContext, useContext, useRef, useState } from "react"
import { TodoTypeEnum } from "../constants/enum"
import { TODO } from "../constants/todo"

export type Todo = {
  type: TodoTypeEnum
  name: string
}

type SelectedTodoList = {
  [key in TodoTypeEnum]?: Todo[]
}

interface TodoContext {
  todoList: Todo[]
  selectedList: SelectedTodoList
  selectTodo: (todo: Todo) => void
  unSelectTodo: (name: string) => void
}

const TodoContext = createContext<TodoContext>({
  todoList: [],
  selectedList: {},
  selectTodo: () => {},
  unSelectTodo: () => {},
})

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todoList, setTodoList] = useState<Todo[]>(TODO)
  const [selectedList, setSelectedList] = useState<SelectedTodoList>({})

  const returnTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  )

  const returnToTodoList = (todo: Todo) => {
    if (returnTimersRef.current.has(todo.name)) {
      clearTimeout(returnTimersRef.current.get(todo.name))
      returnTimersRef.current.delete(todo.name)
    }

    setSelectedList((prev) => {
      const newList = { ...prev }

      for (const type in newList) {
        const todoType = type as TodoTypeEnum

        newList[todoType] = newList[todoType]?.filter(
          (item) => item.name !== todo.name
        )
      }

      return newList
    })

    setTodoList((prev) => {
      if (prev.some((item) => item.name === todo.name)) {
        return prev
      }
      return [...prev, todo]
    })
  }

  const scheduleAutoReturn = (todo: Todo) => {
    if (returnTimersRef.current.has(todo.name)) {
      clearTimeout(returnTimersRef.current.get(todo.name))
      returnTimersRef.current.delete(todo.name)
    }

    const timer = setTimeout(() => {
      returnTimersRef.current.delete(todo.name)

      const todoType = todo.type
      const currentTodo = selectedList[todoType]?.find(
        (item) => item.name === todo.name
      )

      if (currentTodo) {
        returnToTodoList(currentTodo)
      }
    }, 5000)

    returnTimersRef.current.set(todo.name, timer)
  }

  const selectTodo = (todo: Todo) => {
    setTodoList((prev) => prev.filter((item) => item.name !== todo.name))

    setSelectedList((prev) => {
      const newList = { ...prev }
      const todoType = todo.type

      if (!newList[todoType]) {
        newList[todoType] = []
      }

      if (!newList[todoType]?.some((item) => item.name === todo.name)) {
        newList[todoType]?.push(todo)
      }

      return newList
    })

    scheduleAutoReturn(todo)
  }

  const unSelectTodo = (name: string) => {
    let todoToReturn: Todo | undefined = undefined

    for (const type in selectedList) {
      const todoType = type as TodoTypeEnum
      const todo = selectedList[todoType]?.find((item) => item.name === name)

      if (todo) {
        todoToReturn = todo
        break
      }
    }

    if (todoToReturn) {
      returnToTodoList(todoToReturn)
    }
  }

  const value = {
    todoList,
    selectedList,
    selectTodo,
    unSelectTodo,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export function useTodo() {
  return useContext(TodoContext)
}
