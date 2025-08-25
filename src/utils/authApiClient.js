import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    withCredentials: true
})

export const registerUser = async (userData) => {
    return await api.post('/auth/register', userData)
}

export const loginUser = async (email, password) => {
    return await api.post('/auth/login', { email, password })
}

export const logoutUser = async () => {
    return await api.post('/auth/logout')
}

export const forgotPassword = async (email) => {
    return await api.post('/auth/forgot-password', { email })
}

export const resetPassword = async (token, password) => {
    return await api.post(`/auth/reset-password/${token}`, { password })
}

export const changePassword = async (oldPassword, newPassword) => {
    return await api.put('/auth/changepassword', { oldPassword, newPassword })
}

export const fetchGoogleUser = async () => {
    return await api.get('/auth/google')
}

export const checkAuth = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/auth/check-auth', { withCredentials: true });
        return res.data;
    } catch (err) {
        throw err;
    }
};