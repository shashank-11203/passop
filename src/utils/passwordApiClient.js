import axios from 'axios'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    withCredentials: true
})

export const fetchPasswords = async () => {
    const res = await api.get('/passwords')
    return res.data
}

export const addPassword = async (data) => {
    return await api.post('/passwords', data)
}

export const updatePassword = async (id, data) => {
    return await api.put(`/passwords/${id}`, data)
}

export const removePassword = async (id) => {
    return await api.delete(`/passwords/${id}`)
}