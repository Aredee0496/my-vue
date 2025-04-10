import { defineStore } from 'pinia'
import apiService from '../service/apiservice.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: '',
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await apiService.login(username, password);
        this.userData = response;
        localStorage.setItem('user', JSON.stringify(response.data.data));
        localStorage.setItem('token', response.data.token);
        return response;
      } catch (error) {
        console.error('Login error:', error);
        return error
      }
    }
  }
})

