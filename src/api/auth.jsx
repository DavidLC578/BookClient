import axios from "axios";
import Cookies from "js-cookie";


const api = 'http://books.test:8080/api'


export const registerRequest = async (user) => {
    const res = axios.post(`${api}/register`, user)
    return res;
}

export const loginRequest = async (user) => {
    const res = axios.post(`${api}/login`, user)
    return res;
}

export const getUser = async () => {
    const token = Cookies.get("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await axios.get(`${api}/me`, config);
};
