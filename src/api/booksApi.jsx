import axios from "axios";
import Cookies from "js-cookie";

const api = 'http://books.test:8080/api'

export const publish = async (value) => {
    const token = Cookies.get("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    };
    return await axios.post(`${api}/books`, value, config)
}

export const getBooks = async () => {
    const token = Cookies.get("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return await axios.get(`${api}/books`, config)
}