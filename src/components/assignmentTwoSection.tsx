import { useState } from "react"
import { getUsersByDepartment } from "../api/userApi"
import type { UserGroupByDepartment } from "../type/userType"

export default function AssignmentTwoSection() {
  const [data, setData] = useState<UserGroupByDepartment>()

  const fetchData = async () => {
    const resp = await getUsersByDepartment()
    setData(resp)
  }

  return (
    <div className="mt-4 pb-10">
      <button
        onClick={fetchData}
        className="border border-gray-300 px-3 py-1 rounded-md cursor-pointer hover:bg-gray-200"
      >
        Fetch Data
      </button>
      <code className="block mt-2 bg-gray-100 p-3 rounded-md min-h-[300px]">
        {data ? (
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          "Click the button to fetch data"
        )}
      </code>
    </div>
  )
}
