import axios from 'axios'

export const baseIP = "192.168.1.66"
export const axiosInstance = axios.create({
    // baseURL: 'http://localhost:9002'
    baseURL: `http://${baseIP}:9002`
})
