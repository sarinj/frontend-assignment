import axios from "axios"

const baseURL = import.meta.env.VITE_API_URL

export const request = axios.create({
  baseURL,
})
