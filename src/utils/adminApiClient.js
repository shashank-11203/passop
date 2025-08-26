import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/admin`,
    withCredentials: true
})

export const fetchUserStats = async () => {
    return await api.get('/stats');
}

export const getUsers = async ()=>{
    return await api.get('/users');
}

export const deleteUserById = async(userId)=>{
    return await api.delete(`/users/${userId}`);
}