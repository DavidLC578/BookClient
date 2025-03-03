import axios from "axios";
import Cookies from "js-cookie";

const api = import.meta.env.VITE_API_URL;

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
    return await axios.get(`${api}/books`)
}

export const getBook = async (id) => {
    return await axios.get(`${api}/books/${id}`)
}

export const downloadBook = async (id) => {
    return await axios.get(`${api}/books/${id}/download`, {
        responseType: 'blob'
    })
}

export const deleteBook = async (id) => {
    const token = Cookies.get("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    };
    return await axios.delete(`${api}/books/${id}`, config)
}