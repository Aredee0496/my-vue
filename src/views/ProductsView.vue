<template>
  <a-row :gutter="[16, 16]">
    <a-col
      v-for="product in products"
      :key="product._id"
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
    >
      <a-card :bordered="true" style="border: 2px solid #1890ff; overflow: hidden; border-radius: 8px;">
        <template #cover>
          <div style="width: 100%; height: 200px; overflow: hidden; border-top-left-radius: 6px; border-top-right-radius: 6px;">
            <img
              :src="`http://localhost:3000/images/${product.image}`"
              alt="Product Image"
              style="width: 100%; height: 100%; object-fit: fill;"
            />
          </div>
        </template>
        <p>{{ product.name }}</p>
        <p>ราคา: {{ product.price }} บาท</p>
        <p>จำนวนในคลัง: {{ product.quantity }} ชิ้น</p>
        <div style="text-align: center; margin: 8px 0;"><a-input-number
          v-model:value="quantity"
          :min="1"
          :max="product.quantity"
          style="width: 50px;"
        /></div>
        <div style="text-align: center; margin-top: 8px;">
          <a-button type="primary" @click="addToCart(product)">เพิ่มลงตะกร้า</a-button>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import apiservice from '@/service/apiservice';
import { ref, onMounted } from 'vue';
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const products = ref([]);
const quantity = ref(1);

const getProducts = async () => {
  const response = await apiservice.fetchProducts();
  if (response.status === 200) {
    products.value = response.data;
    return products.value;
  } else {
    console.error('Error fetching products:', response);
    return [];
  }
}

const addToCart = (products) => {
  const items = {
    ...products,
    quantity: quantity.value,
    totalPrice: quantity.value * products.price
  };
  cartStore.AddToCart(items);
}

onMounted(() => {
  getProducts();
});
</script>
