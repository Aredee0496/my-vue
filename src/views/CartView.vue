<template>
  <a-card :title="'ตะกร้าสินค้า'" style="width: 100%">
    <div v-if="cartItems.length === 0" style="text-align: center;">
      <a-typography.Text>ไม่มีสินค้าที่เพิ่มในตะกร้า</a-typography.Text>
    </div>

    <a-row :gutter="16">
      <a-col v-for="item in cartItems" :key="item.id" :span="6">
        <a-card :hoverable="true">
          <img :src="`http://localhost:3000/images/${item.image}`" alt="Product Image" class="cart-image">
          <a-card-meta :title="item.name" :description="`${item.price} บาท`" />
        </a-card>
      </a-col>
    </a-row>


    <div v-if="cartItems.length > 0" style="margin-top: 20px; text-align: right;">
      <a-typography.Text strong>รวมทั้งหมด: {{ totalPrice }} บาท</a-typography.Text>
      <a-button type="primary" style="margin-left: 10px;">ดำเนินการต่อ</a-button>
    </div>
  </a-card>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore()

const cartItems = computed(() => cartStore.items)
console.log('Cart Items:', cartItems.value)
console.log('cart item ', cartItems.value[0]?.image)

</script>



<style scoped>
.cart-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
