import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/admin',
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