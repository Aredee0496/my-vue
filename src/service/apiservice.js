import axios from "axios";
const API_BASE_URL = 'http://localhost:3000/api/v1';


const apiService = axios.create({
  baseURL: API_BASE_URL,
});

const login = async (username, password) => {
  try {
    const response = await apiService.post('/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Login service error:', error);
    return { success: false, error: error.response?.data || { message: 'Login failed' } };
  }
};

const fetchProducts = async (token) => {
  try {
    console.log('token: ', token);
    console.log('path url: ', API_BASE_URL + '/products');
    const response = await apiService.get('/products', {headers :  {'Authorization': `${token}`}} );
    console.log('Response in product: ', response );
    return response.data;
  } catch (error) {
    console.error('Get products service error:', error);
    return { success: false, error: error.response?.data || { message: 'Failed to fetch products' } };
  }
};

export default {apiService, login, fetchProducts};
