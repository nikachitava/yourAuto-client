import axios from 'axios'

export const useAxios = axios.create({
    baseURL: "https://yourauto-server.onrender.com/",
    withCredentials: true
})