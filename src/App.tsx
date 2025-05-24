import "./App.css"
import AssignmentTwoSection from "./components/assignmentTwoSection"
import TodoList from "./components/TodoList"

function App() {
  return (
    <div className="size-full space-y-4">
      <h2 className="text-2xl">1. Auto Delete Todo List</h2>
      <TodoList />
      <h2 className="text-2xl">2. Create data from API</h2>
      <AssignmentTwoSection />
    </div>
  )
}

export default App
