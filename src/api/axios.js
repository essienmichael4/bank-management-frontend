import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000/api/v1"
})

export const axiosPrivate = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {"Content-Type": "Application/json"}
})