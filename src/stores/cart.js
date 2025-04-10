import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  actions: {
    AddToCart(product) {
      this.items.push(product)
      console.log("add in cart from store ", product);
    },
    RemoveFromCart(productId) {
      this.items = this.items.filter((items) => items.id !== productId)
    },
  },
  getters: {
    cartCount: (state) => state.items.length,
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + item.price, 0)
    },
  },
})
