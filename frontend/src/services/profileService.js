import API from './api'

// Fetch user profile
export const getProfile = () => API.get('/profile')
