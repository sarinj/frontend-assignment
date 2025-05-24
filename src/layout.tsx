import { TodoProvider } from "./hooks/useTodo"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TodoProvider>
      <div className="mx-[10%] py-6 h-[100vh]">{children}</div>
    </TodoProvider>
  )
}
