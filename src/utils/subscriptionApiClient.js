import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true
})

export const createSubsciprtion = async (plan) => {
    return await api.post('/subscription/create', plan)
}

export const markUserPremium = async (session_id) => {
    return await api.post('/subscription/mark-premium', { session_id })
}

export const fetchSubscription = async () => {
    return await api.get('/subscription/my-transactions')
}