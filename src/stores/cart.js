import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  actions: {
    AddToCart(item) {
      const foundItem = this.items.find(i => i._id === item._id);
      if (foundItem) {
        foundItem.quantity += item.quantity;
        foundItem.totalPrice = foundItem.quantity * foundItem.price;
      } else {
        this.items.push(item);
      }
    },
    RemoveFromCart(productId) {
      this.items = this.items.filter(item => item._id !== productId);
    },
    IncreaseQuantity(productId) {
      console.log("กำลังเพิ่ม ");

      const item = this.items.find(i => i._id === productId);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.price;
      }
    },
    DecreaseQuantity(productId) {
      const item = this.items.find(i => i._id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.price;
      }
    },
  },
  getters: {
    cartCount: (state) => state.items.length,
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + item.totalPrice, 0);
    },
  },
});
