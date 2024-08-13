import axios from "axios";

const URL = 'https://66bb949e6a4ab5edd638d3e8.mockapi.io/stockproducts'

export const axiosInstance = axios.create({
    baseURL: URL
})