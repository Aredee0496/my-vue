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
    return response.data
  } catch (err) {
    throw err.response?.data?.message || err.message;
  }
}

const createOrder = async (body) => {
  try {
    console.log('body   ', body)
    const response = await apiService.post('/orders', body);
    return response.data;
  } catch (err) {
    console.error("Error creating order", err);
    throw err.response?.data?.message || err.message;
  }
};

const addProduct = async (body) => {
  try {
    const response = await apiService.post('/products', body);
    return response.data;
  } catch (err) {
    console.error("Error add products", err);
    throw err.response?.data?.message || err.message;
  }
};

const deleteProduct = async (_id) => {
  try {
    const response = await apiService.delete(`/products/${_id}`);
    return response.data;
  } catch (err) {
    console.error("Error delete products", err);
    throw err.response?.data?.message || err.message;
  }
};

const updateProduct = async (_id, body) => {
  try {
    const response = await apiService.put(`/products/${_id}`, body);
    return response.data;
  } catch (err) {
    console.error("Error Edit products", err);
    throw err.response?.data?.message || err.message;
  }
};

const fetchOrders= async () => {
  try {
    const response = await apiService.get('/orders')
    return response.data
  } catch (err) {
    throw err.response?.data?.message || err.message;
  }
};

export default { apiService, login, fetchProducts, createOrder, addProduct, deleteProduct, updateProduct, fetchOrders}
