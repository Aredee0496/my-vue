import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api/v1'

const apiService = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

const login = async (username, password) => {
  try {
    const response = await apiService.post('/login', { username, password })
    return response.data
  } catch (error) {
    console.error('Login service error:', error)
    return { success: false, error: error.response?.data || { message: 'Login failed' } }
  }
}

const fetchProducts = async () => {
  try {
    const response = await apiService.get('/products')
    console.log('Response in product: ', response)
    return response.data
  } catch (error) {
    console.error('Get products service error:', error)
    if (error.response) {
      console.error('Error response:', error.response)
    }
    return {
      success: false,
      error: error.response?.data || { message: 'Failed to fetch products' },
    }
  }
}

const createOrder = async (body) => {
  try {
    console.log('body   ', body)
    const response = await apiService.post('/orders', body);
    return response.data;
  } catch (error) {
    console.error("Error creating order", error);
    return null;
  }
};

export default { apiService, login, fetchProducts, createOrder }
