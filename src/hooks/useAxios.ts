import axios from 'axios'

export const useAxios = axios.create({
    baseURL: "https://yourauto-server.onrender.com/",
    // baseURL: "http://localhost:3000/",
    withCredentials: true
})