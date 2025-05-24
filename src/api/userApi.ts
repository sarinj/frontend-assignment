import type { User, UserGroupByDepartment } from "../type/userType"
import { request } from "../utils/axiosClient"

async function getUsers(): Promise<User[]> {
  const resp = await request.get("/users")
  return resp.data.users
}

async function getUsersByDepartment(): Promise<UserGroupByDepartment> {
  const users = await getUsers()
  const summary: UserGroupByDepartment = {}
  const ageSummary: Record<string, { minAge: number; maxAge: number }> = {}

  users.forEach((user) => {
    const department = user.company.department
    const gender = user.gender.toLowerCase()
    const hairColor = user.hair.color
    const fullName = `${user.firstName}${user.lastName}`
    const postalCode = user.address.postalCode
    const age = user.age

    if (!summary[department]) {
      summary[department] = {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {},
        addressUser: {},
      }

      ageSummary[department] = {
        minAge: Infinity,
        maxAge: -Infinity,
      }
    }

    if (gender === "male") {
      summary[department].male += 1
    } else if (gender === "female") {
      summary[department].female += 1
    }

    if (!summary[department].hair[hairColor]) {
      summary[department].hair[hairColor] = 0
    }
    summary[department].hair[hairColor] += 1

    summary[department].addressUser[fullName] = postalCode

    ageSummary[department].minAge = Math.min(ageSummary[department].minAge, age)
    ageSummary[department].maxAge = Math.max(ageSummary[department].maxAge, age)
  })

  Object.keys(summary).forEach((department) => {
    const { minAge, maxAge } = ageSummary[department]
    summary[department].ageRange = `${minAge}-${maxAge}`
  })

  return summary
}

export { getUsers, getUsersByDepartment }
