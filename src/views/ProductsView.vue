<template>
  <a-row :gutter="[16, 16]">
    <a-col v-for="product in products" :key="product._id" :xs="24" :sm="12" :md="8" :lg="6">
      <a-card :bordered="true" style="border: 2px solid #1890ff;">
        <template #cover>
          <img :src="`http://localhost:3000/images/${product.image}`" alt="Product Image"
            style="height: 200px; height: auto;  object-fit: cover;" />
        </template>

        <p>{{ product.name }}</p>
        <p>ราคา: {{ product.price }} บาท</p>
        <p>จำนวนในคลัง: {{ product.quantity }} ชิ้น</p>
        <a-input-number v-model:value="quantity" :min="1" :max="product.quantity" style="width: 100px;" />
        <div style="text-align: center;">
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
  console.log("get product before api ", response);

  if (response.status === 200) {
    products.value = response.data;
    console.log('Products:', products.value);
    console.log('api data:', response.data);

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
    totalPrice: quantity.value*products.price
  };
  cartStore.AddToCart(items);
}

onMounted(() => {
  getProducts();
});

</script>
